import axios from 'axios'

const API_URL = 'https://api.pipe.run/v1/'

export default axios.create({
  baseURL: API_URL,
  data: {},
  params: {},
  headers: {
    'Token': localStorage.getItem('token'),
    'Content-Type': 'application/json',
  }
})