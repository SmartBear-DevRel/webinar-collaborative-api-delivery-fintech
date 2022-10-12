const axios = require('axios');
const defaultBaseUrl = 'http://your-api.example.com';
const api = (baseUrl = defaultBaseUrl) => ({
  getPayees: (country_of_registration) => {
    const params = new URLSearchParams({
      country_of_registration
    });
    return axios
      .get(baseUrl + '/', {
        headers: { Authorization: 'Bearer 1234' },
        params
      })
      .then((response) => response.data)
      .catch((error) => error);
  }

  /* other endpoints here */
});

const { PactV3, MatchersV3 } = require('@pact-foundation/pact');

const providerWithConsumerA = new PactV3({
  consumer: 'SmartBearCoin-Payee-Provider-A',
  provider: 'SmartBearCoin-Payee-Provider'
});

const providerWithConsumerB = new PactV3({
  consumer: 'SmartBearCoin-Payee-Provider-B',
  provider: 'SmartBearCoin-Payee-Provider'
});

const { like, eachLike } = MatchersV3;

describe('tests with Pact', () => {
  it('tests consumer ', () => {
    const expectedError = {
      details: [
        {
          title: 'missing-request-parameter',
          detail:
            "The request does not contain the conditionally required parameter 'name', when 'jurisdiction_identifier' is not provided.",
          contextData: [
            {
              path: '/name',
              condition: 'jurisdiction_identifier == null'
            }
          ]
        }
      ]
    };
    providerWithConsumerA
      .given('payees exist')
      .given('is authenticated')
      .uponReceiving('A bad request to get all payees')
      .withRequest({
        method: 'GET',
        path: '/',
        query: { country_of_registration: like('DE') },
        headers: {
          Authorization: like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 400,
        body: like(expectedError),
        contentType: 'application/json'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = api(mockserver.url);
      return client.getPayees('DE').catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });

  it('tests consumer a', () => {
    const expectedError = {
      success: false,
      details: [
        {
          title: 'missing-request-parameter',
          detail:
            "The request does not contain the conditionally required parameter 'name', when 'jurisdiction_identifier' is not provided.",
          contextData: [
            {
              path: '/name',
              condition: 'jurisdiction_identifier == null'
            }
          ]
        }
      ]
    };
    providerWithConsumerB
      .given('payees exist')
      .given('is authenticated')
      .uponReceiving('A bad request to get all payees')
      .withRequest({
        method: 'GET',
        path: '/',
        query: { country_of_registration: like('DE') },
        headers: {
          Authorization: like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 400,
        body: like(expectedError),
        contentType: 'application/json'
      });
    return providerWithConsumerB.executeTest((mockserver) => {
      const client = api(mockserver.url);
      return client.getPayees('DE').catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });
});
