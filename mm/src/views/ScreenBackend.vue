<template>
  <v-container pl-0 pr-0>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8>
      
        <v-card>

          <v-card-title primary-title>
            <div>
              <h3>Information:</h3>
            </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-card flat ml-0 pl-0>
              <v-layout row justify-start pl-3>
                <div pl-3>Default Dataset: {{ defaultDataSetName }}.</div>
            </v-layout>
            </v-card>
            <v-card flat ml-0 pl-0>
              <v-layout row justify-start pl-3>
                <div pl-3>Current Dataset: {{ currentDataSetName }}.</div>
              </v-layout>
            </v-card>
          </v-card>

          <br>  

          <v-card>
            <v-card-title primary-title>
              <div>
                <h3>Backend Access Firebase:</h3>
              </div>
            </v-card-title>

            <v-divider></v-divider>

            <v-card flat>
              <app-backend-action-item
                :buttonText="'Load'"
                :disabled="!defaultDataSetName"
                :clicked="() => loadDataSetFromBackendByName(defaultDataSetName)"
                >
                <label slot="title" class="subheading">Load default:</label>
              </app-backend-action-item>
            </v-card>

            <v-divider></v-divider>

            <div>
              <v-card flat>
                <app-backend-action-item
                  :buttonText="'Save'"
                  :clicked="() => saveToBackendByName(currentDataSetName, true)"
                  >
                  <label slot="title" class="subheading">Save current dataset:</label>
                </app-backend-action-item>
              </v-card>
              <v-divider></v-divider> 
            </div>

            <v-card flat>
              <app-backend-action-item
                :buttonText="'Overwrite'"
                :clicked="() => saveToBackendByName(defaultDataSetName, true)"
                >
                <label slot="title" class="subheading">Overwrite default dataset:</label>
              </app-backend-action-item>
            </v-card>

            <v-divider></v-divider>

            <v-card flat>
              <app-backend-select-action-item
                :buttonText="'Load'"
                :clicked="(value) => loadDataSetFromBackendByName(value)"
                :selectItems="availableDataSetsSorted"
                :selectLabel="'Name of Dataset'"
                :selectIsLoading="selectIsLoading"
                >
              </app-backend-select-action-item>
            </v-card>

            <v-divider></v-divider>

            <v-card flat>
              <app-backend-input-action-item
                :buttonText="'Save As'"
                :clicked="(value) => saveToBackendByName(value, true, () => saveAsInputName = '')"
                :inputLabel="'Name of Dataset'"
                :inputText="saveAsInputName"
                @change="saveAsInputName = $event"
                >
              </app-backend-input-action-item>
            </v-card>

            <v-divider></v-divider>

            <v-card flat>
              <app-backend-select-action-item
                :buttonText="'Merge'"
                :clicked="(value) => mergeToBackendByName(value)"
                :selectItems="availableDataSetsSorted"
                :selectLabel="'Name of Dataset'"
                :selectIsLoading="selectIsLoading"
                >
              </app-backend-select-action-item>
          </v-card>

        </v-card>

        <v-divider></v-divider>

        <br>
      
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3>Hardcoded Datasets:</h3>
            </div>
          </v-card-title>

          <v-divider></v-divider>
          <v-card flat>
            <app-backend-select-action-item
              :buttonText="'Load'"
              :clicked="(value) => loadDataSetFromCode(value)"
              :selectItems="localLoaders.map(loader => loader.name).sort()"
              :selectLabel="'Name of dataset'"
              >
            </app-backend-select-action-item>
          </v-card>

          <v-divider></v-divider>

          <v-card flat>
            <app-backend-action-item
              :buttonText="!dataSetVisible ? 'Display' : 'Hide'"
              :clicked="toggleJsonData"
              :showResultIndicator="false"
              >
              <label
                slot="title"
                class="subheading">{{ !dataSetVisible ? "Display DataSet as Json" : "Hide Json Data"}}:
              </label>
            </app-backend-action-item>
          </v-card>
        
        </v-card>

        <br>
        <div>
          <v-layout justify-start text-xs-left>
            <pre v-html="jsonData"></pre>
          </v-layout>
        </div>
      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

import * as backend from './../persistence/backend/firebase';
import testDataLoaders from './../model/testData'
import { MultiTaskManagerData } from './../model/MultiTaskManagerData';

import BackendActionItem from '../components/backend/BackendActionItem';
import BackendSelectActionItem from '../components/backend/BackendSelectActionItem';
import BackendInputActionItem from '../components/backend/BackendInputActionItem';

const mmDataDefaultName = 'mmDataSet'

export default {
  components: {
    appBackendActionItem: BackendActionItem,
    appBackendSelectActionItem: BackendSelectActionItem,
    appBackendInputActionItem: BackendInputActionItem
  },
  data() {
    return {
      defaultDataSetName: mmDataDefaultName,
      dataSetNameToLoad: '',
      localLoaders: [],
      dataSetVisible: false,
      jsonData: null,
      saveAsInputName: '',
      selectIsLoading: false,
      storeUnsubscribeFunc: null
    }
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/recipes',
      menues: 'menues/menues',
      currentDataSetName: 'backend/currentDataSetName',
      currentDataSetVersion: 'backend/currentDataSetVersion',
      availableDataSets: 'backend/availableDataSets'
    }),
    availableDataSetsSorted() {
      return this.availableDataSets(true);
    }
  },
  methods: {
    ...mapActions({
      save: 'backend/save',
      load: 'backend/load',
      mergeSave: 'backend/mergeSave',
      loadAvailableDataSets: 'backend/loadAvailableDataSets'
    }),
    updateDataSetNamesFromBackend() {

      this.selectIsLoading = true;
      this.loadAvailableDataSets({loadFunc: () => backend.loadDataSetNames()})
      .finally(() => {
        this.selectIsLoading = false;
      });
    },
    loadDataSetFromBackendByName(name) {
      
      // Load the data via store action. This handles all store relevant state changes.
      const loadPromise = this.load({loadFunc: () => backend.loadDataSet(name)});
      
      loadPromise.
      then(() => {
        this.updateJsonData();
      })
      .catch(() => {
        // handeled elsewhere
      });

      // Return the promise to give the caller of this function a chance
      // to react to success or failure of the load action.
      return loadPromise;
    },  
    saveToBackendByName(name, overwrite, successCallback) {

      // Get the data to save and increase the version.
      const dataSet = this.getDataSet(name, this.currentDataSetVersion);
      if(!overwrite) dataSet.version += 1;

      // Save the data via store action. This handles all store relevant state changes.
      const savePromise = this.save({saveFunc: () => backend.saveDataSet(dataSet, overwrite)});
      savePromise
      .then(() => {
        if(successCallback) successCallback();
      })
      .catch(() => {
        // handeled elsewhere
      });

      // Return the promise to give the caller of this function a chance
      // to react to success or failure of the load action.
      return savePromise;
    },  

    mergeToBackendByName(name) {

      // This implementation does not handle the case where items were removed in the
      // destination dataset but are still present in the src dataset.
      // For that to work it would be necessary to track all added/deleted items
      // and apply those changes selectively.

      // Get the data to save and increase the version.
      const currentDataSet = this.getDataSet(this.currentDataSetName, this.currentDataSetVersion);
      currentDataSet.version += 1;

      // Load the destination data and merge if necessary.
      const mergePromise = backend.loadDataSet(name)
      .then(dstData => {

        const noMergeNeeded =
          dstData.version + 1 == currentDataSet.version &&
          currentDataSet.name == dstData.name;

        let dataToSave = null;
        if(!noMergeNeeded) {
          const nameBackup = dstData.name;
          dataToSave = dstData;
          MultiTaskManagerData.merge(currentDataSet, dataToSave, this.removedMenueItemIds, this.removedRecipeItemIds);
          dataToSave.name = nameBackup;
          dataToSave.version++;
        }
        else {
          dataToSave = currentDataSet;
        }
        return dataToSave;
      })
      .then(mergedDataSet => {
        // Save the merged data, but only if the destination data didn't change
        // since it was loaded (see above).
        return this.mergeSave({saveFunc: () => backend.saveDataSet(mergedDataSet, false)});
      });
       
      mergePromise
      .then(() => {
        this.updateJsonData();
      })
      .catch(() => {
        // handeled elsewhere
      });

      // Return the promise to give the caller of this function a chance
      // to react to success or failure of the load action.
      return mergePromise;
    },
    
    getDataSet(name, version) {
      const mmData = new MultiTaskManagerData(name, version);
      mmData.recipes = this.recipes;
      mmData.menues = this.menues;
      return mmData;
    },
    loadDataSetFromCode(name) {

      return new Promise(resolve => {
        const loader = testDataLoaders.find(loader => loader.name == name);
        if(loader) {
          this.load({ loadFunc: () => Promise.resolve(loader.func(name)) })
          .then(() => {
            this.updateJsonData()
            .then(resolve);
          });
        }
      });
    },
    toggleJsonData() {

      this.dataSetVisible = !this.dataSetVisible;
      if(!this.dataSetVisible) {
        this.jsonData = null;
      }
      this.updateJsonData();
    },
    updateJsonData() {

      return new Promise((resolve) => {

        if(this.dataSetVisible) {
          const mmData = new MultiTaskManagerData(this.currentDataSetName, 1);
          mmData.recipes = this.recipes;
          mmData.menues = this.menues;
          setTimeout(() => {
            this.jsonData = JSON.stringify(mmData, undefined, 1);
            resolve();
          },  0); 
        }
        else {
          resolve();
        }
      });
    }
  },
  mounted() {
    this.updateDataSetNamesFromBackend();
    // this.storeUnsubscribeFunc = this.$store.subscribe((mutation, state) => {
    this.storeUnsubscribeFunc = this.$store.subscribe(() => {
      // console.log('[ScreenBackend][StoreSubscription][Mutation]', mutation);
    });
  },
  beforeDestroy() {
    if(this.storeUnsubscribeFunc) this.storeUnsubscribeFunc();
  },
  created() {
    this.localLoaders = testDataLoaders;
  }
}
</script>

<style scoped>
</style>

