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

    <v-row class="ml-5"><p v-if="msg">{{ msg }}</p></v-row>
    
    <v-row>
      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="recipe in getallRecipes.results" :key="recipe.id"
          :style="'border-bottom: 3px solid teal'"
          class="ma-1"
        >
          <v-expansion-panel-header v-onhover>{{recipe.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col>
                <p class="ml-5">Incredients:</p>
                <v-simple-table class="ma-5 ml-10">
                    <tr v-for="incredients in recipe.incredients.split('§')" :key="incredients">{{"> "+incredients}}</tr>
                </v-simple-table>
              </v-col>
              <v-col>
                <p class="ml-5">How to cook:</p>
                <v-simple-table class="ma-5 ml-10">
                    <tr v-for="howtocook in recipe.howtocook.split('§')" :key="howtocook">{{"> "+howtocook}}</tr>
                </v-simple-table>
              </v-col>
            </v-row>
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
    directives: {
    onhover: {
      bind(el) {
        el.onmouseover = function() {
          el.style.fontSize = "25px";
        };
        el.onmouseout = function() {
          el.style.fontSize = "15px";
        };
      }
    }
  }
  }
</script>

<style lang="css">
 
 .v-expansion-panel-header{
   text-transform: uppercase;
   font-family: italic;
 }

</style>