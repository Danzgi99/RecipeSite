<template>
    <v-container>
         <v-row>
            <v-list  width="50%" >
                  <v-col cols="12">
                    <h2 id="heading">Write Recipe</h2>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text" 
                      label="Title"
                      v-model="title"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                <v-col cols="12">
                    <v-textarea
                      label="Lebensmittel"
                      v-model="incredients"
                      color="teal"
                    >
                    </v-textarea>
                  </v-col>
                 <v-col cols="12">
                    <v-textarea
                      label="Wie wirds gemacht?"
                      v-model="howtocook"
                      color="teal"
                    >
                    </v-textarea>
                  </v-col>
                <br>
                <v-col cols="12">
                    <v-btn color="teal" @click="write">
                      <span>ADD</span>
                   </v-btn>
                   <p v-if="msg">{{ msg }}</p>
                  </v-col>
            </v-list>
       </v-row>  
    </v-container>
</template>

<script>
import Recipeservices from '../services/Recipeservices.js';
import {mapGetters} from 'vuex';

export default {
  name: 'WriteRecipe',
  data() {
    return {
      title: '',
      incredients: '',
      howtocook:'',
      msg: ''
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  methods: {
    async write() {
      try {
        const references = {
          userID: this.getUser.idUser,
          title: this.title,
          incredients: this.incredients,
          howtocook: this.howtocook
        };
        const response = await Recipeservices.writeRecipe(references);
        this.msg = response.msg;
        this.$router.push('/searchrecipes');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>