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
      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="recipe in getallRecipes.results" :key="recipe.id"
          :style="'border-bottom: 3px solid teal'"
          class="ma-1"
        >
          <v-expansion-panel-header>{{recipe.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text class="ml-5">Incredients:</v-text>
            <v-simple-table class="ma-5">
                <tr v-for="incredients in recipe.incredients.split('§')" :key="incredients">{{incredients}}</tr>
            </v-simple-table>
            <v-text class="ml-5">Hot to cook:</v-text>
            <v-simple-table class="ma-5">
                <tr v-for="incredients in recipe.incredients.split('§')" :key="incredients">{{incredients}}</tr>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
       msg: '',
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

<style lang="scss">
 
 .v-expansion-panel-header{
   font-size: 140%;
   text-transform: uppercase;
   font-family: italic;
 }

 

</style>