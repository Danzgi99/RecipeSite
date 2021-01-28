<template>
  <v-container>
    <v-row>
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        v-model="searchparameter"
        label="Search for specific"
      ></v-text-field>
      <p v-if="msg">{{ msg }}</p>
      <v-btn @click="searchRecipes()">
          <span>S</span>
          </v-btn>
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
    name: 'searchRecipes',
    data() {
     return {
       searchparameter: '',
       msg: ''
     }
    },

    methods: {
      ...mapActions(['allRecipes']),
        async searchRecipes() {
            try {
              const reference = {
                search: this.searchparameter
              };
            const response = await Recipeservices.searchRecipe(reference);
            this.$store.commit('SET_RECIPES', response);
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
    },
  }
</script>