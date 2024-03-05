import axios from 'axios';
import { format } from 'date-fns';
import md5 from 'md5';

const getAuthLine = (password = 'Valantis') => {
  return md5(`${password}_${format(new Date(), 'yyyyMMdd')}`);
};

export const instance = axios.create({
  baseURL: 'https://api.valantis.store:41000/',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth': getAuthLine(),
  },
});

instance.interceptors.response.use(undefined, function (error) {
  console.error('error request', error.message);
  return instance(error.config);
});
