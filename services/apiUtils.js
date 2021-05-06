import {apiClientSchool} from './client';
const REQUEST_TIMEOUT = 60000;

export default class APIUtils {
  static accessToken;
  static hostURL;
  static setAccessToken(token) {
    this.accessToken = `Bearer ${token}`;
  }
  static setHost(host) {
    this.hostURL = host;
  }

  static getHost() {
    return this.hostURL;
  }
  static getAccessToken() {
    return this.accessToken;
  }

  static get(uri, params, headers) {
    return new Promise((resolve, reject) =>
      apiClientSchool(this.hostURL)
        .get(uri, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
          params,
        })
        .then(response => {
          // console.log('>>>>>>> Response >>>>>> : ', response);
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }

  static post(uri, postData, headers) {
    return new Promise((resolve, reject) => {
      apiClientSchool(this.hostURL)
        .post(uri, postData, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
            ...headers,
          },
        })
        .then(response => {
          const {data} = response;
          // if (data && data.status) {
          resolve(data);
          // } else {
          //   reject(handleErrorMessage(response.data));
          // }
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static postFormData(uri, postData) {
    const form_data = new FormData();
    for (const key in postData) {
      form_data.append(key, postData[key]);
    }
    // console.log('>>>>>>> Request>>>>>> : ', postData);
    return new Promise((resolve, reject) => {
      apiClientSchool(this.hostURL)
        .post(uri, form_data, {
          timeout: REQUEST_TIMEOUT,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        });
    });
  }

  static put(uri, updateData) {
    return new Promise((resolve, reject) =>
      apiClientSchool(this.hostURL)
        .put(uri, updateData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.accessToken,
          },
        })
        .then(response => {
          const {data} = response;
          resolve(data);
        })
        .catch(err => {
          console.log('[error]', {err});
          reject(err);
        }),
    );
  }
}
