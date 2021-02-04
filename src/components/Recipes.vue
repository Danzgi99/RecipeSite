<template>
  <v-container>
    <v-row class="ma-10"> 
      <v-card v-if="!recipes.results">
        <span>Want to write a recipe?</span>
        <v-btn class="ml-10">
          <router-link to="/writerecipe" class="teal--text">Click here</router-link>
        </v-btn>
      </v-card>
      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="recipe in recipes.results" :key="recipe.recipeID" 
          :style="'border-bottom: 3px solid teal'"
          class="ma-1"
        >
          <v-expansion-panel-header>
            <v-row>
              <v-col>
                {{recipe.title}}
                <v-btn 
                 @click="[deleterecipe(recipe.recipeID), deletedrecipes.push(recipe.recipeID)]" 
                 class="ml-10" 
                 v-if="!showdeleteMsg(recipe.recipeID)"
                 color="teal black--text"
                 >
                  DELETE 
                </v-btn>
                <span v-if="showdeleteMsg(recipe.recipeID)"  class="ml-10">{{ msg }}</span>
            </v-col>
            </v-row>
          </v-expansion-panel-header>
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
import Recipeservices from '../services/Recipeservices.js';
import {mapGetters} from 'vuex';

export default {
  name: 'userRecipe',
  data() {
    return {
      msg: '',
      deletedrecipes: [],
      recipes:[]
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    async userRecipes() {
        try {
          const reference = {
            userID: this.getUser.idUser,
          };
          const response = await Recipeservices.userRecipe(reference);
          this.recipes=response;
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      },

      async deleterecipe(recipeid){
        try {
          const reference = {
            recipeID: recipeid,
          };
          console.log(reference);
          console.log(this.deletedrecipes);
          const response = await Recipeservices.deleteRecipe(reference);
          this.msg = response.msg;
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      },

      showdeleteMsg(recid){
         for(var i=0; i < this.deletedrecipes.length; i++){
           if(this.deletedrecipes[i] == recid){
            return true
           }
         }
      }
  },

  created (){
    this.userRecipes();
    //bei page-refresh array clearen
    this.deletedrecipes = [];
  }
}
</script>
