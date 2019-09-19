
const state = {
  currentDataSetName: 'mmDataSet',
  currentDataSetVersion: 1,
  availableDataSets: []
};

const getters = {
  currentDataSetName: state => {
    return state.currentDataSetName;
  },
  currentDataSetVersion: state => {
    return state.currentDataSetVersion;
  },
  availableDataSets: state => (sort = true) => {
    return sort
      ? state.availableDataSets.slice().sort()
      : state.availableDataSets;
  }
};

const mutations = {
  setCurrentDataSetName: (state, payload) => {
    state.currentDataSetName = payload.name;
  },
  setCurrentDataSetVersion: (state, payload) => {
    state.currentDataSetVersion = payload.version;
  },
  setAvailableDataSets: (state, payload) => {
    state.availableDataSets = payload.availableDataSets;
  },
  addAvailableDataSetName: (state, payload) => {
    state.availableDataSets.push(payload.name);
  }
};

const actions = {
  setCurrentDataSetName: (context, payload) => {
    context.commit('setCurrentDataSetName', payload);
  },
  setCurrentDataSetVersion: (context, payload) => {
    context.commit('setCurrentDataSetVersion', payload);
  },
  load: (context, payload) => {
    
    const loadPromise = payload.loadFunc();

    loadPromise
    .then(dataSet => {
      context.dispatch('recipes/clearRemovedItemIds', null, { root: true });
      context.dispatch('recipes/setRecipes', { recipes: dataSet.recipes }, { root: true });

      context.dispatch('menues/clearRemovedItemIds', null, { root: true });
      context.dispatch('menues/setMenues', { menues: dataSet.menues }, { root: true});

      context.commit('setCurrentDataSetName', {name: dataSet.name });
      context.commit('setCurrentDataSetVersion', { version: dataSet.version });
    })
    .catch(() => {
      // handled elsewhere
    });

    // Return the promise, so the caller can react accordingey if needed.
    return loadPromise;
  },
  save: (context, payload) => {
    const savePromise = payload.saveFunc();

    savePromise
    .then(dataSet => {
      context.commit('setCurrentDataSetVersion', { version: dataSet.version });
      context.commit('setCurrentDataSetName', { name: dataSet.name });
      context.dispatch('addAvailableDataSetName', { name: dataSet.name });
    })
    .catch(() => {
      // handled elsewhere
    });

    // Return the promise, so the caller can react accordingey if needed.
    return savePromise;
  },
  mergeSave: (context, payload) => {
    const savePromise = payload.saveFunc();

    savePromise
    .then(dataSet => {
      context.commit('setCurrentDataSetVersion', { version: dataSet.version });
      context.commit('setCurrentDataSetName', { name: dataSet.name });

      context.dispatch('recipes/clearRemovedItemIds', null, { root: true });
      context.dispatch('recipes/setRecipes', { recipes: dataSet.recipes }, { root: true });

      context.dispatch('menues/clearRemovedItemIds', null, { root: true });
      context.dispatch('menues/setMenues', { menues: dataSet.menues }, { root: true});
    })
    .catch(() => {
      // handled elsewhere
    });

    // Return the promise, so the caller can react accordingey if needed.
    return savePromise;
  },
  loadAvailableDataSets: (context, payload) => {

    const promise = payload.loadFunc();
    promise.then(dataSetNames => {
      context.commit('setAvailableDataSets', { availableDataSets: dataSetNames});
    })
    .catch(() => {
      // handled elsewhere
    });

    // Return the promise, so the caller can react accordingly if needed.
    return promise;
  },
  addAvailableDataSetName: (context, payload) => {

    if(!context.state.availableDataSets.find(name => name == payload.name)) {
      context.commit('addAvailableDataSetName', payload);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};