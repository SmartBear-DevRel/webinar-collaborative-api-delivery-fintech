import { API } from './Api';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const providerWithConsumerA = new PactV3({
  consumer: process.env.PACT_CONSUMER ?? 'SmartBearCoin-Payments-UI',
  provider: process.env.PACT_PROVIDER ?? 'SmartBearCoin-Payee-Provider'
});

const { like, eachLike, reify } = MatchersV3;

describe('AI-generated Pact tests for API', () => {
  it('should return payees with proper authentication', () => {
    const expectedResponse = {
      data: eachLike({
        account_name: like('Alice Example'),
        any_bic: like('COBADEFFXXX'),
        bank_account_currency: like('EUR'),
        bank_code: like('37040044'),
        bank_name: like('Commerzbank'),
        iban: like('DE89370400440532013000'),
        id: like('payee-1'),
        name: like('Alice')
      })
    };
    const expectedPayees = reify(expectedResponse.data);

    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given('payees exist for the given criteria')
      .uponReceiving('A request to get payees with filters')
      .withRequest({
        method: 'GET',
        path: '/payees',
        query: { country_of_registration: like('DE'), name: like('Alice') },
        headers: {
          'x-Authorization': like('Bearer 2024-01-01T00:00:00.000Z')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedResponse,
        contentType: 'application/json'
      });
    
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayees('DE', 'Alice').then((res) => {
        expect(res).toEqual(expectedPayees);
      });
    });
  });

  it('should return empty array when no payees match criteria', () => {
    const expectedResponse = { data: [] };

    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given('no payees match the criteria')
      .uponReceiving('A request to get payees with no matches')
      .withRequest({
        method: 'GET',
        path: '/payees',
        query: { country_of_registration: like('XX'), name: like('Nobody') },
        headers: {
          'x-Authorization': like('Bearer 2024-01-01T00:00:00.000Z')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedResponse,
        contentType: 'application/json'
      });
    
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayees('XX', 'Nobody').then((res) => {
        expect(res).toEqual([]);
      });
    });
  });

  it('should return a specific payee by ID', () => {
    const id = 'payee-1';
    const expectedPayee = {
      account_name: like('Alice Example'),
      any_bic: like('COBADEFFXXX'),
      bank_account_currency: like('EUR'),
      bank_code: like('37040044'),
      bank_name: like('Commerzbank'),
      iban: like('DE89370400440532013000'),
      id: like(id),
      name: like('Alice')
    };

    providerWithConsumerA
      .given('server is up')
      .given('is authenticated')
      .given(`a payee with id ${id} exists`)
      .uponReceiving(`A request to get payee with id ${id}`)
      .withRequest({
        method: 'GET',
        path: '/payees/' + id,
        headers: {
          'x-Authorization': like('Bearer 2024-01-01T00:00:00.000Z')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedPayee,
        contentType: 'application/json'
      });
    
    return providerWithConsumerA.executeTest((mockserver) => {
      const client = new API(mockserver.url);
      return client.getPayeeById(id).then((res) => {
        expect(res).toEqual(reify(expectedPayee));
      });
    });
  });

  it('should handle unauthorized requests', () => {
    const id = 'payee-1';

    providerWithConsumerA
      .given('server is up')
      .given('authentication is required')
      .uponReceiving(`A request without proper authorization`)
      .withRequest({
        method: 'GET',
        path: '/payees/' + id,
        headers: {
          'x-Authorization': like('invalid-token')
        }
      })
      .willRespondWith({
        status: 401
      });
    
    return providerWithConsumerA.executeTest(async (mockserver) => {
      const client = new API(mockserver.url);
      // Override the auth method to test unauthorized scenario
      client.generateAuthToken = () => 'invalid-token';
      
      return expect(client.getPayeeById(id)).rejects.toThrow();
    });
  });
});