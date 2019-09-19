<template>
  <div id="app">
      <v-app>
      <v-content>
      <v-container pl-0 pr-0>

      <app-main></app-main>
        
      <!-- <v-layout row wrap justify-center>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/recipes-edit">ScreenRecipesEdit</router-link> |
        <router-link to="/menuescook">Cook</router-link> |
        <router-link to="/menues-edit"> | MenuesEdit</router-link>
        <router-link to="/recipes"> | Recipes</router-link>
        <router-link to="/backend"> | Backend</router-link>
      </v-layout> -->
      
          
      <router-view/>
          

      <app-info-modal
        v-if="error"
        :clicked="resetError"
        >
        <h3 slot="title">{{errorTitle}}</h3>
        <h5 slot="message">{{errorMessage}}</h5>
      </app-info-modal>

      </v-container>
      </v-content>
      </v-app>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import InfoModal from './components/InfoModal';
import { loadDataSet } from './persistence/backend/firebase';
import MainApp  from './components/MainApp'


export default {
    props: {
        source: String
    },
  components: {
    appInfoModal: InfoModal,
    appMain: MainApp
  },
  data() {
    return { 
        drawer: null,
    }
  },
  computed: {
    ...mapGetters({
      error: 'errors/error',
      errorTitle: 'errors/errorTitle',
      errorMessage: 'errors/errorMessage'
    })
  },
  methods: {
    ...mapActions({
      loadData: 'backend/load',
      resetError: 'errors/resetError',
      addError: 'errors/addError',
    }),
  },
  mounted() {

    // Load the data via store action.
    this.loadData({loadFunc: () => loadDataSet('mmDataSet')})
    .catch(error => {
      this.addError({
        errorTitle: 'Failed to Load Data from firebase',
        errorMessage: error.message ? error.message : "No further error information available"
      });
    });
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  }

  html {
    overflow-y: auto;
  }
</style>
