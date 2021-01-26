import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/usermodule'
import recipes from './modules/recipemodule'

//um daten der seite nach neuladen zu bekommen 
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

//create store
export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],

  modules:{
    users,
    recipes
  }
});