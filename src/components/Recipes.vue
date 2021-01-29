<template>
  <v-container>
    <v-row>
      <v-card elevation="13" width="300" v-for="recipe in recipes.results" :key="recipe.recipeID" >
          <v-card-title>{{recipe.title}}</v-card-title>
          <v-card-text>{{recipe.incredients}}</v-card-text>
          <br/>
          <v-card-text>{{recipe.howtocook}}</v-card-text>
          <v-btn @click="deleterecipe(recipe.recipeID)">
            <span>DELETE</span>
          </v-btn>
          <p v-if="msg">{{ msg }}</p>
      </v-card>
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
          const response = await Recipeservices.deleteRecipe(reference);
          this.msg = response.msg;
        } catch (error) {
          this.msg = error.response.data.msg;
        }
      }
  },

  created(){
    this.userRecipes();
  }
}
</script>
