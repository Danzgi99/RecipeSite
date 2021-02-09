<template>
         <v-row class="ma-10">
            <v-list  width="100%" :style="'border: 3px solid teal'">
                <v-list-item >
                  <h2 id="heading">LOGIN</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Username" type="text" v-model="username" :rules="usernrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" v-model="password" :rules="pwrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item>
                    <v-btn @click="login" color="teal black--text">
                      LOGIN
                   </v-btn>
                   <p v-if="msg">{{ msg }}</p>
                </v-list-item>
                <v-list-item >
                    <p>You don't have an account?</p>
                    <p class="ml-3"><router-link to="/register" class="teal--text">Register</router-link></p>
                </v-list-item>
            </v-list>
       </v-row>
</template>

<script>
import Userservices from '../services/Userservices.js';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      msg: '',

      pwrules: [
        value => !!value || 'Required.',
      ],
      usernrules: [
        value => !!value || 'Required.',
      ],
    }
  },

  methods: {
    async login() {
      try {
        const references = {
          username: this.username,
          password: this.password
        };
        const response = await Userservices.login(references);
        this.msg = response.msg;
        const token = response.token;
        const user = response.user;
        this.$store.dispatch('login', { token, user });
        this.$router.push('/');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
}
</script>