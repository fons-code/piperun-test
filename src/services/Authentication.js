
import axios from '../config/axios';

export default {
  login: async (email, password) => {
    axios.post('auth?', { email, password }).then(resp => {
      const token = resp.data.data.me.token;
      localStorage.setItem('token', resp.data.data.me.token);
      localStorage.setItem('account_id', resp.data.data.me.account_id);
      return token;
    }).catch(err => {
      console.log(err);
    })
  }
}