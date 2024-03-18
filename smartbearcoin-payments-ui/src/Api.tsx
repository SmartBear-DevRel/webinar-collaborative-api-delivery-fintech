import { Payee } from './Payee';

import axios from "axios";

const defaultBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  // 'https://sbdevrel-fua-smartbearcoin-prd.azurewebsites.net/api';
  // 'https://sbdevrel-fua-smartbearcoin-acc.azurewebsites.net/api';
  'https://virtserver.swaggerhub.com/mhiggins-sa/payee-api/1.0.0';
// 'http://localhost:7071/api/';

export class API {
  url: string;
  constructor(url: string) {
    if (url === undefined || url === '') {
      url = defaultBaseUrl;
    }
    if (url.endsWith('/')) {
      url = url.substr(0, url.length - 1);
    }
    this.url = url;
  }

  withPath(path: string) {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return `${this.url}${path}`;
  }

  generateAuthToken() {
    return 'Bearer ' + new Date().toISOString();
  }

  async getPayees(country_of_registration: string, name: string) {
    const params = new URLSearchParams({
      country_of_registration,
      name
    });
    return axios
      .get(this.withPath('/payees'), {
        headers: {
          'x-Authorization': this.generateAuthToken()
        },
        params
      })
      .then((r: { data: { data: Payee[] } }) =>
        r.data.data.map((p) => new Payee(p))
      );
  }

  async getPayeeById(id: string) {
    return axios
      .get(this.withPath('/payees/' + id), {
        headers: {
          'x-Authorization': this.generateAuthToken()
        }
      })
      .then((r: { data: Payee }) => new Payee(r.data));
  }
}

export default new API(defaultBaseUrl);
