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

    <v-row class="ml-5"><p v-if="searchmsg">{{ searchmsg }}</p></v-row>
    
    <v-row>
      <v-expansion-panels inset>
        <v-expansion-panel
          v-for="recipe in getallRecipes.results" :key="recipe.id"
          :style="'border-bottom: 3px solid teal'"
          class="ma-1"
        >
          <v-expansion-panel-header v-onhover>
            <v-row>
              <v-col>
                {{recipe.title}}
                <v-btn 
                 @click="[like(recipe.recipeID), likedrecipes.push(recipe.recipeID)]" 
                 v-if="isLoggedIn && !showLikedMsg(recipe.recipeID)"
                 class="ml-10" 
                 color="teal black--text"
                 >
                  LIKE 
                </v-btn>
                <v-btn 
                 @click="[unlike(recipe.recipeID), removefromliked(recipe.recipeID)]" 
                 v-if="isLoggedIn && showLikedMsg(recipe.recipeID)"
                 class="ml-10" 
                 color="teal black--text"
                 >
                  UNLIKE 
                </v-btn>
                <span class="ml-10">{{recipe.likes}} LIKES</span>
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
import {mapGetters, mapActions} from 'vuex';
import Recipeservices from '../services/Recipeservices.js';

  export default {
    name: 'searchRecipes',
    data() {
     return {
       searchparameter: '',
       searchmsg: '',
       likedrecipes: [],
       likemsg: '',
       zahl: 0,
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
            this.searchmsg=false;
            } catch (error) {
             this.searchmsg = error.response.data.msg;
            }
          },

          async like(recipeid){
            try {
              const reference = {
                recipeID: recipeid,
                userID: this.getUser.idUser
              };
              const response = await Recipeservices.likeRecipe(reference);
              this.likemsg = response.msg;
            } catch (error) {
              this.likemsg = error.response.data.msg;
            }
          },

          async unlike(recipeid){
            try {
              const reference = {
                recipeID: recipeid,
                userID: this.getUser.idUser
              };
              const response = await Recipeservices.unlikeRecipe(reference);
              this.likemsg = response.msg;
            } catch (error) {
              this.likemsg = error.response.data.msg;
            }
          },

          //gelikede Recipes in Array speichern damit
          //festgestelt werden kann ob LIKE oder UNLIKE Button displayed
          async getlikedrecipes(){
            try {
              this.likedrecipes=[];
              const reference = {
                userID: this.getUser.idUser
              };
              const response = await Recipeservices.getlikedRecipe(reference);
              for(var i=0; i < response.results.length; i++){
                this.likedrecipes.push(response.results[i].rID);
              }
            } catch (error) {
              this.likemsg = error.response.data.msg;
            }
          },

          //v-ifs bei Buttons
          //true = LIKE, false = UNLIKE
          showLikedMsg(recid){
            for(var i=0; i < this.likedrecipes.length; i++){
              if(this.likedrecipes[i] == recid){
                return true
              }
            }
          },

          //unliked Recipes aus dem Array loeschen
          //dafuer Arrayindex von RecipeID herausfinden
          removefromliked(recid){
            for(var i=0; i < this.likedrecipes.length; i++){
              if(this.likedrecipes[i] == recid){
                var idIndex = this.likedrecipes.indexOf(this.likedrecipes[i])
                this.likedrecipes.splice(idIndex, 1);
              }
            }
          },
    },

    computed:{
      ...mapGetters(['getallRecipes']),
      ...mapGetters(['getUser']),
      ...mapGetters(['isLoggedIn'])
    },

    created(){
      this.allRecipes();
      if(this.isLoggedIn){
        this.getlikedrecipes();
      }
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