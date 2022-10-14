const axios = require('axios').default;
const adapter = require('axios/lib/adapters/http');

axios.defaults.adapter = adapter;
const defaultBaseUrl =
  process.env.REACT_APP_API_BASE_URL ||
  'https://sbdevrel-fua-smartbearcoin-acc.azurewebsites.net/api/payees';

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
      .get(this.withPath('/'), {
        headers: {
          Authorization: this.generateAuthToken(),
          params
        }
      })
      .then((r: { data: any }) => r.data);
  }

  async getPayeeById(id: string) {
    return axios
      .get(this.withPath('/' + id), {
        headers: {
          Authorization: this.generateAuthToken()
        }
      })
      .then((r: { data: any }) => r.data);
  }
}

export default new API(defaultBaseUrl);
