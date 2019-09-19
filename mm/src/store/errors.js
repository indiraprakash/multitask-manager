
const state = {
  error: false,
  errorTitle: '',
  errorMessage: ''
};

const getters = {
  error: state => {
    return state.error;
  },
  errorTitle: state => {
    return state.errorTitle;
  },
  errorMessage: state => {
    return state.errorMessage
  }
};

const mutations = {
  addError: (state, payload) => {
    state.error = true;
    state.errorTitle = payload.errorTitle;
    state.errorMessage = payload.errorMessage;
  },
  resetError: (state) => {
    state.error = false;
    state.errorTitle = '';
    state.errorMessage = '';
  }
};

const actions = {
  addError: (context, payload) => {
    context.commit('addError', payload);
  },
  resetError: (context, payload) => {
    context.commit('resetError', payload);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};