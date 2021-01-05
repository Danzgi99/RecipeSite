<template>
    <v-container>
         <v-row>
            <v-list  width="50%" >
                <v-list-item >
                  <h2 id="heading">Write Recipe</h2>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Title" type="text" v-model="recipe.title"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Lebensmittel" type="text" v-model="recipe.incredients"></v-text-field>
                </v-list-item> 
                <v-list-item >
                    <v-text-field label="Wie wirds gemacht?" type="text" v-model="recipe.howtoCook"></v-text-field>
                </v-list-item>
                <v-list-item >
                    <v-text-field label="Was ist zu beachten?" type="text" v-model="recipe.goodtoKnow" :rules="emailrules" hide-details="auto"></v-text-field>
                </v-list-item>
                <br>
                <v-list-item >
                    <v-btn >
                      <span>ADD</span>
                   </v-btn>
                </v-list-item>
            </v-list>
       </v-row>  
    </v-container>
</template>

<script>
export default {
  name: 'WriteRecipe',
  data() {
    return {
      recipe: {
        title: "",
        incredients: "",
        howtoCook:"",
        goodtoKnow: "",
      },
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>