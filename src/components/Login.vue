<template>
    <v-container>
         <v-row>
            <v-list  width="50%" >
                <v-list-item >
                  <h2 id="heading">LOGIN</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="eMail" type="text" v-model="emailOrUsername" :rules="eourules" hide-details="auto"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" v-model="password" :rules="pwrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item >
                    <v-btn >
                      <span>LOGIN</span>
                   </v-btn>
                </v-list-item>
                <v-list-item >
                    <p>Forgot Password?</p>
                    <p>You don't have an account?</p>
                    <router-link to="/login" >Login</router-link>
                </v-list-item>
            </v-list>
       </v-row>  
    </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      emailOrUsername: "",
      password:"",

      pwrules: [
        value => !!value || 'Required.',
      ],
      eourules: [
        value => !!value || 'Required.',
      ],
    }
  }
}
</script>

<style scoped>
</style>