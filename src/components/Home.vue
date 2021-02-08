<template>
  <v-container>
    <v-row class="mt-5"><h1>Welcome to RECIPESITE</h1></v-row>
    <v-row v-if="!isLoggedIn" class="ma-10"><v-btn @click="$router.push('/login')">LOGIN</v-btn></v-row>
    <v-row v-if="!isLoggedIn" class="ma-10"><v-btn @click="$router.push('/register')">CREATE AN ACCOUNT</v-btn></v-row>
    <v-row class="ma-10"><v-btn @click="$router.push('/searchrecipes')">VIEW ALL RECIPES</v-btn></v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

  export default {
    name: 'Home',

    data: () => ({
    }),

     computed: {
    ...mapGetters(['isLoggedIn'])
    }
  }
</script>
