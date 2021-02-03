<template>
         <v-row class="ma-10">
            <v-list  width="100%" :style="'border: 3px solid teal'">
                <v-list-item >
                  <h2 id="heading">LOGIN</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Username" type="text" v-model="username" :rules="usernrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" v-model="password" :rules="pwrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item >
                    <v-btn @click="login">
                      <span>LOGIN</span>
                   </v-btn>
                   <p v-if="msg">{{ msg }}</p>
                </v-list-item>
                <v-list-item >
                    <p>Forgot Password?</p>
                    <p>You don't have an account?</p>
                    <p><router-link to="/register" >Register</router-link></p>
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