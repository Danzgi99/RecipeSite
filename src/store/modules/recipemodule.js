import axios from 'axios'

const url = 'http://localhost:3000/api';

  const state = {
    recipes: []
  };
  
  const getters= {
    getallRecipes: state => {
      return state.recipes;
    }
  };

  const mutations = {
    SET_RECIPES: (state, recipes) => {
      state.recipes = recipes;
    }
  };

  const actions = {
    async allRecipes({ commit }){
      const response = await axios.get(url + '/recipes');
      commit('SET_RECIPES', response.data);
    },
  };

export default {
    state,
    getters,
    mutations,
    actions
}