import {URL} from '@env';
import axios from 'axios';

const Api = {
  getbyName(params, event) {
    // console.log(URL + `GetByName?Name=${params}`);
    axios
      .post(URL + `GetByName?Name=${params}`)
      .then(res => {
        event(res);
      })
      .catch(err => {
        event(err);
      });
  },
  getbyId(params, event) {
    // console.log(URL + `GetByName?Id=${params}`);
    axios
      .post(URL + `GetByName?Id=${params}`)
      .then(res => {
        event(res);
      })
      .catch(err => {
        event(err);
      });
  },
};
export default Api;
