<template>
         <v-row class="ma-10">
            <v-list  width="100%" :style="'border: 3px solid teal'">
                  <v-col cols="12">
                    <h2 id="heading">Write Recipe</h2>
                  </v-col>
                  <v-col>
                    <v-text-field
                      type="text" 
                      label="Title"
                      v-model="title"
                      color="teal"
                    ></v-text-field>
                  </v-col>
                <v-col>
                    <v-textarea
                      label="Lebensmittel"
                      v-model="incredients"
                      color="teal"
                    >
                    </v-textarea>
                  </v-col>
                 <v-col>
                    <v-textarea
                      label="Wie wirds gemacht?"
                      v-model="howtocook"
                      color="teal"
                    >
                    </v-textarea>
                  </v-col>
                <br>
                <v-col>
                    <v-btn color="teal" @click="write">
                      <span>ADD</span>
                   </v-btn>
                   <p v-if="msg">{{ msg }}</p>
                  </v-col>
            </v-list>
       </v-row>
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
          incredients: this.removeLineBreak(this.incredients),
          howtocook: this.removeLineBreak(this.howtocook)
        };
        const response = await Recipeservices.writeRecipe(references);
        this.msg = response.msg;
        this.$router.push('/searchrecipes');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },

    //enter in textarea durch Beistrich ersetzten fuer schoenere insert-form in DB
    //die buchstaben sind alles formen die einen Zeilenumbruch darstellen
    // gm sind modifier die z.b all matches replacen nicht nur den ersten
    removeLineBreak(str){
     return str.replace(/(\r\n|\n|\r)/gm,"§");
    }
  }
}
</script>