import Api from './api';

const scannService = {
  loadName(params) {
    return new Promise((resolve, reject) => {
      Api.getbyName(params, response => {
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  },
  loadId(params) {
    return new Promise((resolve, reject) => {
      Api.getbyId(params, response => {
				console.log(response.data);
        if (response.status == 200) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  },
};
export default scannService;
