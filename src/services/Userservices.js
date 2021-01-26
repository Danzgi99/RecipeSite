import axios from 'axios'

const url = 'http://localhost:3000/api';

export default {
  login(references) {
    return axios
      .post(url + '/login/', references)
      .then(response => response.data);
  },

  register(references) {
    return axios
      .post(url + '/register/', references)
      .then(response => response.data);
  },

  getSecretContent() {
    return axios.get(url + 'secret-route/').then(response => response.data);
  }
};