import { API } from './Api';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const providerWithConsumerA = new PactV3({
  consumer: 'SmartBearCoin-Payments-UI',
  provider: 'SmartBearCoin-Payee-Provider'
});

const { like } = MatchersV3;

describe('test with pact', () => {
  it('should return all payees', () => {
    const expectedMessage = 'Payees will soon be returned here!';
    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .uponReceiving('A request to get all payees')
      .withRequest({
        method: 'GET',
        path: '/',
        query: { country_of_registration: like('DE'), name: like('test') },
        headers: {
          Authorization: like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedMessage,
        contentType: 'text/plain'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayees('DE', 'foo').then((res) => {
        expect(res).toEqual(expectedMessage);
      });
    });
  });
  it('should return a particular payee', () => {
    const id = '592b4ece-c7a2-46ff-b380-96fd1638852a';
    const expectedMessage = `Details on payeeId: ${id} will be available shortly`;
    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given(`a payee with id ${id} exists`)
      .uponReceiving(`A request to get payee with id ${id}`)
      .withRequest({
        method: 'GET',
        path: '/' + id,
        headers: {
          Authorization: like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedMessage,
        contentType: 'text/plain'
      });
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayeeById(id).then((res) => {
        expect(res).toEqual(expectedMessage);
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
        path: '/' + id,
        headers: {
          Authorization: like('Bearer 1234')
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
