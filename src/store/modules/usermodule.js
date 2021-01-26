import Axios from 'axios'

const getDefaultState = () => {
  return {
    token: '',
    user: {}
  };
};

  const state = getDefaultState();
  
  const getters= {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    }
  };

  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  };

  const actions = {
    login: ({ commit }, { token, user }) => {
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
      //den JWT Token der API als Authorization Header setzen
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit('RESET', '');
    }
  };

export default {
    state,
    getters,
    mutations,
    actions
}