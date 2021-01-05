<template>
    <v-container>
         <v-row>
            <v-list  width="50%" >
                <v-list-item >
                  <h2 id="heading">REGISTER</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Firstname" id="firstName" v-model="person.firstname"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Lastname" type="text" v-model="person.lastname"></v-text-field>
                </v-list-item> 
                <v-list-item >
                    <v-text-field label="Username" id="userName" v-model="person.username"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="eMail" type="text" v-model="person.email" :rules="emailrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Password" type="password" v-model="person.password" :rules="pwrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item >
                    <v-btn >
                      <span>REGISTER</span>
                   </v-btn>
                </v-list-item>
            </v-list>
       </v-row>  
    </v-container>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      person: {
        firstname: "",
        lastname: "",
        username:"",
        email: "",
        password: ""
      },
      pwrules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 6) || 'Min 6 characters',
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>