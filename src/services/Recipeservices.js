import axios from 'axios'

const url = 'http://localhost:3000/api';

export default {
  writeRecipe(references) {
    return axios
      .post(url + '/writerecipe', references)
      .then(response => response.data);
  },

  searchRecipe(references) {
    return axios.get(url + '/recipes', references).then(response => response.data);
  }
};