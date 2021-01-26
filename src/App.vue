<template>
 <v-app>
  <nav>
    
     <v-navigation-drawer
        v-model="drawerleft"
        app
        clipped
        left
      >
        <v-list dense >
          <v-list-item @click.stop="drawerleft = !drawerleft"  v-if="!isLoggedIn">
            <v-list-item-content>
              <v-list-item-title> <router-link to="/register">Register</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="drawerleft = !drawerleft"  v-if="!isLoggedIn">
            <v-list-item-content>
              <v-list-item-title> <router-link to="/login">Login</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="drawerleft = !drawerleft">
            <v-list-item-content >
              <v-list-item-title> <router-link to="/recipes">View Recipes</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="drawerleft = !drawerleft" v-if="isLoggedIn">
            <v-list-item-content >
              <v-list-item-title> <router-link to="/writerecipe">Write Recipe</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click.stop="drawerleft = !drawerleft">
            <v-list-item-content v-if="isLoggedIn">
              <v-btn value="Logout" @click="logout">
                 <span>LOGOUT {{getUser.username}}</span>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

   <v-app-bar
      app
      fixed
      color="teal"
      dark
    >
      <v-btn @click="drawerleft = !drawerleft">
          <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>
          <span>myRecipe</span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
    </v-app-bar>
 
  </nav>

    <v-main>
      <router-view/>
    </v-main>
 </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({
      drawerleft: false,
    }),
  
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapGetters(['getUser'])
  },

  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>
