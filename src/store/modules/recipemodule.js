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
    },
    NEW_RECIPE: (state, recipes) => {
      state.recipes = recipes;
    },
    RESET: state => {
      Object.assign(state);
    }
  };

  const actions = {
    async allRecipes({ commit }){
      const response = await axios.get(url + '/recipes');
      commit('SET_RECIPES', response.data);
    },

    searchRecipe: ({ commit }, {data}) => {
      commit('SET_RECIPES', data);
    }
  };

export default {
    state,
    getters,
    mutations,
    actions
}