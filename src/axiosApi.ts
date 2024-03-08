import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://console.firebase.google.com/u/0/project/arsenchernov-blog/database/arsenchernov-blog-default-rtdb/data/~2F',
});

export default axiosApi;