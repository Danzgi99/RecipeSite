<template>
         <v-row class="ma-10">
            <v-list  width="100%" :style="'border: 3px solid teal'">
                <v-list-item >
                  <h2 id="heading">REGISTER</h2>
                  <v-list-item-title></v-list-item-title>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Username" type="text" v-model="username" :rules="unrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="eMail" type="text" v-model="email" :rules="emailrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" v-model="password" :rules="pwrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password-Check" type="password" v-model="passwordcheck" :rules="pwrules" hide-details="auto" color="teal"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item >
                    <v-btn @click="register" color="teal black--text">
                      REGISTER
                   </v-btn>
                   <p v-if="msg">{{ msg }}</p>
                </v-list-item>
            </v-list>
       </v-row>   
</template>

<script>
import Userservices from '../services/Userservices.js';

export default {
  name: 'Register',

  data() {
   return {
      username: '',
      email: '',
      password: '',
      passwordcheck: '',
      msg: '',

      unrules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 5) || 'Min 5 characters',
      ],
      pwrules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 8) || 'Min 8 characters',
      ],
      emailrules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 30 || 'Max 30 characters',
        value => {
            //Prüfung ob richtige email-Schreibweise
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],
    }
  },

  methods: {
    async register() {
      try {
        const references = {
          username: this.username,
          email: this.email,
          password: this.password,
          passwordcheck: this.passwordcheck
        };
        const response = await Userservices.register(references);
        this.msg = response.msg;
        this.$router.push('/login');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>