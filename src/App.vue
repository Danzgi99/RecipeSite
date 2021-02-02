<template>
 <v-app>
  <nav>
      <v-app-bar
        app
        fixed
        color="teal"
        dark
      >
        <v-btn @click="drawerleft = !drawerleft">
            <v-icon color="teal">mdi-menu</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="black--text">myRecipe</v-toolbar-title>
        <v-spacer></v-spacer> 
      </v-app-bar>

     <v-navigation-drawer
        v-model="drawerleft"
        app
        left
      >
          <v-list dense>
            <v-subheader>Menu</v-subheader>

            <v-list-item-group active-class="teal black--text">

                <router-link to="/register" >
                 <v-list-item @click.stop="drawerleft = !drawerleft"  v-if="!isLoggedIn">
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title> Register</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <router-link to="/login">
                  <v-list-item @click.stop="drawerleft = !drawerleft"  v-if="!isLoggedIn">
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title> Login</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <router-link to="/searchrecipes">
                  <v-list-item @click.stop="drawerleft = !drawerleft">
                    <v-list-item-icon>
                      <v-icon>mdi-cards</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                      <v-list-item-title> View Recipes</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <router-link to="/userrecipes">
                  <v-list-item @click.stop="drawerleft = !drawerleft" v-if="isLoggedIn">
                    <v-list-item-icon>
                      <v-icon>mdi-garage</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                      <v-list-item-title> View my Recipes</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <router-link to="/writerecipe">
                  <v-list-item @click.stop="drawerleft = !drawerleft" v-if="isLoggedIn" >
                    <v-list-item-icon>
                      <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content >
                      <v-list-item-title> Write Recipe</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>

                <v-list-item @click.stop="drawerleft = !drawerleft">
                  <v-list-item-content v-if="isLoggedIn">
                    <v-btn value="Logout" @click="logout">
                      <v-icon>mdi-account-off</v-icon>
                      <span>LOGOUT {{getUser.username}}</span>
                    </v-btn>
                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>

          </v-list>
      </v-navigation-drawer>
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

<style>
a{
    text-decoration: none;
}

h2{
  color: teal;
}
</style>