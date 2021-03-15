import axios from 'axios'

const url = 'http://localhost:3000/api';

export default {
  writeRecipe(references) {
    return axios
      .post(url + '/writerecipe', references)
      .then(response => response.data);
  },

  searchRecipe(references) {
    return axios.post(url + '/searchrecipes', references).then(response => response.data);
  },

  userRecipe(references) {
    return axios.post(url + '/userrecipes', references).then(response => response.data);
  },

  deleteRecipe(references){
    return axios.post(url + '/deleterecipes', references).then(response => response.data);
  },

  likeRecipe(references){
    return axios.post(url + '/addLike', references).then(response => response.data);
  },

  unlikeRecipe(references){
    return axios.post(url + '/deleteLike', references).then(response => response.data);
  },

  getlikedRecipe(references){
    return axios.post(url + '/getlikedRecipe', references).then(response => response.data);
  }
};