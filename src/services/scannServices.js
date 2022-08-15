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
  searchKeyword(params) {
    var body = '=';
    if (params != undefined && params != '') {
      body = `=${params}`;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(URL + `GetList?searchKeyword${body}`)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  updateParticipants(obj) {
    return new Promise((resolve, reject) => {
      axios
        .post(URL + `UpdateParticipant`, obj)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
};
export default scannService;
