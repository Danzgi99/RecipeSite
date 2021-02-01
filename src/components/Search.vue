<template>
  <v-container>
    <v-row class="ma-10">
      <v-text-field
        hide-details
        single-line
        v-model="searchparameter"
        label="Search for specific"
        color="teal"
        v-on:keyup.enter="searchRecipes()"

        clear-icon="mdi-close-circle"
        clearable
        @click:clear="allRecipes(); msg=false"

        append-outer-icon="mdi-magnify"
        @click:append-outer="searchRecipes()"
      ></v-text-field>
    </v-row>

    <v-row><p v-if="msg">{{ msg }}</p></v-row>
    
    <v-row>
      <v-col v-for="recipe in getallRecipes.results" :key="recipe.id">
        <v-card width="300" :style="'border: 2px solid teal'" >
            <v-card-title>{{recipe.title}}</v-card-title>
            <v-card-subtitle class="ml-2">Incredients:</v-card-subtitle>
            <v-card-text>{{recipe.incredients}}</v-card-text>
            <v-card-subtitle class="ml-2">How to cook:</v-card-subtitle>
            <v-card-text>{{recipe.howtocook}}</v-card-text>
        </v-card>
      </v-col> 
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
            this.msg=false;
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
