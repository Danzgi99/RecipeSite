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

  sendMail(references){
    return axios.post(url + '/forgotpw', references).then(response => response.data);
  },

  setnewPW(references){
    return axios.post(url + '/changepw', references).then(response => response.data);
  }
};