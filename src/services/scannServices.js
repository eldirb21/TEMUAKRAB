import {URL} from '@env';
import axios from 'axios';

const scannService = {
  loadName(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(URL + `GetByName?Name=${params}`)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  loadId(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(URL + `GetById?Id=${params}`)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
export default scannService;
