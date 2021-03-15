<template>
         <v-row class="ma-10">
            <v-list  width="100%" :style="'border: 3px solid teal'">
                <v-list-item >
                  <h2 id="heading">Change Password</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Your Username" type="text" v-model="username" 
                    :rules="usernrules" hide-details="auto" color="teal"
                    :disabled="textfieldreadonly"></v-text-field>
                    <v-btn @click="sendmail" color="teal black--text">
                      Send Code
                    </v-btn>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="mail-Code" type="text" v-model="typedinCode" hide-details="auto" color="teal"></v-text-field>
                    <v-btn @click="codecheck" color="teal black--text">
                      Check Code
                    </v-btn>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" 
                    v-model="password" :rules="pwrules" 
                    hide-details="auto" color="teal"
                    v-if="checkedcode"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password-Check" type="password"
                     v-model="passwordcheck" :rules="pwrules" 
                     hide-details="auto" color="teal"
                     v-if="checkedcode"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item  v-if="checkedcode">
                    <v-btn @click="setPassword" color="teal black--text">
                      Change Password
                    </v-btn>
                </v-list-item>
                <p v-if="msg">{{ msg }}</p>
            </v-list>
       </v-row>
</template>

<script>
import Userservices from '../services/Userservices.js';

export default {
  name: 'Forgotpw',
  data() {
    return {
      username: '',
      typedinCode: '',
      password: '',
      passwordcheck: '',
      msg: '',
      sendedCode: '',
      checkedcode: false,
      textfieldreadonly: false,

      usernrules: [
        value => !!value || 'Required.',
      ],
      pwrules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 8) || 'Min 8 characters',
      ]
    }
  },

  methods: {
    async sendmail() {
      try {
        const references = {
          username: this.username,
        };
        const response = await Userservices.sendMail(references);
        this.textfieldreadonly=true;
        this.sendedCode = response.code;
        console.log(this.sendedCode);
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },

    codecheck(){
        if(this.sendedCode==this.typedinCode){
            this.checkedcode=true;
        }
        else {
            this.checkedcode=false;
            this.msg="Wrong code";
        }
    },

    async setPassword() {
        try {
            const references = {
            username: this.username,
            password: this.password,
            passwordcheck: this.passwordcheck
            };
            const response = await Userservices.setnewPW(references);
            this.msg = response.msg;
            this.$router.push('/login');
        } catch (error) {
            this.msg = error.response.data.msg;
        }
    }
  },

  created (){
    //bei page-refresh code clearen und readonly von textfeld aufheben
    this.sendedCode = '';
    this.checkedcode= false;
    this.textfieldreadonly=false;
  }
}
</script>