import { API } from './Api';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const providerWithConsumerA = new PactV3({
  consumer: process.env.PACT_CONSUMER ?? 'SmartBearCoin-Payments-UI',
  provider: process.env.PACT_PROVIDER ?? 'SmartBearCoin-Payee-Provider'
});

const { like, eachLike, reify } = MatchersV3;

describe('test with pact', () => {
  it('should return all payees', () => {
    const expectedResponse = {
      data: eachLike({
        account_name: 'account_name',
        any_bic: 'VHO7ZKQT',
        bank_account_currency: 'EUR',
        bank_code: 'bank_code',
        bank_name: 'bank_name',
        iban: 'IE01AIBK935955939393',
        id: '592b4ece-c7a2-46ff-b380-96fd1638852a',
        name: 'name'
      })
    };
    const expectedPayees = reify(expectedResponse.data);

    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .uponReceiving('A request to get all payees')
      .withRequest({
        method: 'GET',
        path: '/payee',
        query: { country_of_registration: like('IE'), name: like('LTD') },
        headers: {
          'x-Authorization': like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedResponse,
        contentType: 'application/json'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayees('IE', 'LTD').then((res) => {
        expect(res).toEqual(expectedPayees);
      });
    });
  });
  it('should return a particular payee', () => {
    const id = '1e331a0f-29bd-4b6b-8b21-8b87ed653c6b';
    const expectedPayee = {
      account_name: 'account_name',
      any_bic: 'VHO7ZKQT',
      bank_account_currency: 'EUR',
      bank_code: 'bank_code',
      bank_name: 'bank_name',
      iban: 'IE01AIBK935955939393',
      id,
      name: 'name'
    };
    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given(`a payee with id ${id} exists`)
      .uponReceiving(`A request to get payee with id ${id}`)
      .withRequest({
        method: 'GET',
        path: '/payee/' + id,
        headers: {
          'x-Authorization': like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: like(expectedPayee),
        contentType: 'application/json'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayeeById(id).then((res) => {
        expect(res).toEqual(expectedPayee);
      });
    });
  });
  it('should return an error if a particular payee is not found', () => {
    const id = '592b4ece-c7a2-46ff-b380-96fd1638852a';
    const expectedMessage = 'Request failed with status code 404';
    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given(`a payee with id ${id} does not exist`)
      .uponReceiving(`A request to get payee with id ${id}`)
      .withRequest({
        method: 'GET',
        path: '/payee/' + id,
        headers: {
          'x-Authorization': like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 404
      });
    return providerWithConsumerA.executeTest(async (mockserver) => {
      const client = new API(mockserver.url);

      return expect(client.getPayeeById(id)).rejects.toThrow(expectedMessage);
    });
  });
});
