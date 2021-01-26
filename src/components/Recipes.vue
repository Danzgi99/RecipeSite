<template>
  <v-container>
    <v-row>
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        v-model="searchparameter"
      ></v-text-field>
      <v-btn @click="search">
          <span>S</span>
          </v-btn>
       <p v-if="msg">{{ msg }}</p>
      <p v-if="msg">{{ msg }}</p>
      <v-card elevation="13" width="300" v-for="recipe in getallRecipes.results" :key="recipe.id" >
          <v-card-title>{{recipe.title}}</v-card-title>
          <v-card-text>{{recipe.incredients}}</v-card-text>
          <br/>
          <v-card-text>{{recipe.howtocook}}</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Recipeservices from '../services/Recipeservices.js';

  export default {
    name: 'Recipes',
    data() {
     return {
       searchparameter: '',
       msg: ''
     }
    },

    methods: {
        ...mapActions(['allRecipes']),
        
        async search() {
          try {
            const references = {
              search: this.searchparameter,
            };
            const response = await Recipeservices.searchRecipe(references);
            this.msg = response.msg;
            this.$store.commit('SET_RECIPES', response.data);
          } catch (error) {
            this.msg = error.response.data.msg;
          }
  }
    },
    computed:{
      ...mapGetters(['getallRecipes'])
    },

    created(){
      this.allRecipes();
    }
  }
</script>
