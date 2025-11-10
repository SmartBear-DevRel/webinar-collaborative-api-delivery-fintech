# SmartBearCoin Payments UI

This project contains the consumer code for the SmartBearCoin Payments system. The consumer is a React based website which allows users to view and manage their payees.

##  Coding & Deployment - Consumer

Here we will be creating a website which we will communicate with our provider and present required information to the user on screen.

![consumer workflow](https://user-images.githubusercontent.com/19932401/224380788-045cf4a1-dd20-48a8-8112-1ae7bf8a5e7c.png)

The scope of our testing with Pact, will be our API collaborator code.

![consumer test scope](https://docs.pact.io/assets/images/consumer-test-coverage-71ca640527716073e40be0b525340500.png)

If you are new to Pact, we would recommend checking out our interactive [5 minute guide](https://docs.pact.io/5-minute-getting-started-guide#an-example-scenario-order-api) which demonstrate key concepts of Pact and contract testing.

To speed up the creation and to ensure we conform with the schemas, we can use SwaggerHub code generation capabilities for the API collaborator as a [Client-SDK](https://support.smartbear.com/swaggerhub/docs/apis/generating-code/client-sdk.html), or we can generate our API collaborator directly.

_NOTE: If you are generating your own API collaborator code, you can skip steps 2-8 and use the code below as a starter for your Pact test_

1. Create our react app `npx create-react-app smartbearcoin-payments-ui --template typescript`
2. In SwaggerHub export a _Client SDK_ from the OpenAPI definition (_Export > Client SDK > Typescript Fetch_)
3. Extract the code from _typescript-fetch_ folder of the `smartbearcoin-payments-ui/src` solution
4. `cd smartbearcoin-payments-ui`
5. `npm install cross-fetch`
6. replace `isomorphicFetch` with `crossfetch` in imports
   1. `import crossfetch from 'cross-fetch';`
7. Update these tests to use `new Date` as just plain unquoted strings
   1. `const transactionFrom: Date = new Date('2013-10-20T19:20:30+01:00');`
   2. `const transactionUntil: Date = new Date('2013-10-20T19:20:30+01:00');`
8. Update test assertions to have assertions, can use expected responses
9. Install pact `npm install @pact-foundation/pact`
10. Copy the test code below into file `smartbearcoin-payments-ui/src/typescript-fetch/api_test.spec.ts`
11. Run `npm run test`
    1. pact files will be generated in `swaggerhub-consumer/pacts` and can now be uploaded to Pactflow
12. Once you are generating consumer contracts at the lowest level in your code (the api collaborator), the team can now concentrate on building out the rest of the website, by consuming the data from the client sdk, or api collaborator code that your team has created (see `./smartbearcoin-payments-ui/src/api.pact.spec.ts`). The expecations in the provider response should contain _only_ the required attributes for the consumer code to perform. Additional fields, will bound your provider to ensuring it always provides those fields despite your consumer code not requiring it.

Your test code will look something like

```typescript
import * as api from './api';
import { Configuration } from './configuration';
import { PactV3, MatchersV3 } from '@pact-foundation/pact';
const provider = new PactV3({
  consumer: 'swaggerhub-consumer',
  provider: 'swaggerhub-provider'
});
const config: Configuration = {};

const { like } = MatchersV3;

describe('CustomerManagementPayeesApi', () => {
  let instance: api.CustomerManagementPayeesApi;

  test('getPayeeById', () => {
    const payeeId: string = 'payeeId_example';
    const xAuthorization: string = 'xAuthorization_example';
    const expectedData = {
      account_name: 'string',
      any_bic: 'AIBKIE2D',
      bank_account_currency: 'EUR',
      bank_address: { city: 'string', country: 'IE', street: 'string' },
      bank_code: 'string',
      bank_name: 'AAAA Bank',
      iban: 'IE01AIBK935955939393',
      id: 'string',
      name: 'string',
      organization_name: 'string',
      payee_address: { city: 'string', country: 'IE', street: 'string' },
      payee_type: 'Person',
      personal_information: { family_name: 'string', first_name: 'string' },
      remittance_email_address: 'test@smartbear.com'
    };
    provider
      .given('is authenticated')
      .given('a payee exists')
      .uponReceiving('a request to get a payee')
      .withRequest({
        method: 'GET',
        path: '/payees/' + payeeId,
        headers: {
          'x-Authorization': like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedData
      });
    return provider.executeTest(async (mockserver) => {
      instance = new api.CustomerManagementPayeesApi({
        ...config,
        basePath: mockserver.url
      });
      const result = await instance.getPayeeById(payeeId, xAuthorization, {});
      expect(result).toEqual(expectedData);
      return;
    });
  });
  test('getPayees', () => {
    const countryOfRegistration: string = 'IE';
    const xAuthorization: string = 'xAuthorization_example';
    const jurisdictionIdentifier: string = 'jurisdictionIdentifier_example';
    const jurisdictionIdentifierType: string = 'chamber-of-commerce-number';
    const name: string = 'name_example';
    const page: number = 56;
    const sort: Array<string> = [];
    const expectedData = {
      data: [
        {
          account_name: 'string',
          any_bic: 'AIBKIE2D',
          bank_account_currency: 'EUR',
          bank_address: { city: 'string', country: 'IE', street: 'string' },
          bank_code: 'string',
          bank_name: 'AAAA Bank',
          iban: 'IE01AIBK935955939393',
          id: 'string',
          name: 'string',
          organization_name: 'string',
          payee_address: {
            city: 'string',
            country: 'IE',
            street: 'string'
          },
          payee_type: 'Person',
          personal_information: { family_name: 'string', first_name: 'string' },
          remittance_email_address: 'test@smartbear.com'
        }
      ],
      links: {
        links: [
          { last: 'string', next: 'string', previous: 'string', self: 'string' }
        ],
        page: 0,
        pageCount: 0,
        pageSize: 0,
        recordCount: 0
      }
    };
    provider
      .given('is authenticated')
      .given('payees exist')
      .uponReceiving('A request to list all payees')
      .withRequest({
        method: 'GET',
        path: '/payees',
        query: {
          jurisdiction_identifier: jurisdictionIdentifier,
          name,
          page: page.toString(),
          jurisdiction_identifier_type: jurisdictionIdentifierType,
          country_of_registration: countryOfRegistration
        },
        headers: {
          'x-Authorization': like('Bearer 1234')
        }
      })
      .willRespondWith({
        status: 200,
        body: expectedData
      });
    return provider.executeTest(async (mockserver) => {
      instance = new api.CustomerManagementPayeesApi({
        ...config,
        basePath: mockserver.url
      });
      const result = await instance.getPayees(
        countryOfRegistration,
        xAuthorization,
        jurisdictionIdentifier,
        jurisdictionIdentifierType,
        name,
        page,
        sort,
        {}
      );
      expect(result).toEqual(expectedData);
      return;
    });
  });
});
```

#### Prerequisites

#### Running locally

1. Clone this repo
2. `cd smartbearcoin-payments-ui`
3. `npm run test` - Run the Pact tests locally
4. `npm run start` - Run the website locally on <http://localhost:5173/>
   1. You can update the endpoint used for the provider, by setting the environment variable `VITE_APP_API_BASE_URL`
      1. <https://sbdevrel-fua-smartbearcoin-prd1.azurewebsites.net/api> - Production
      2. <https://sbdevrel-fua-smartbearcoin-acc1.azurewebsites.net/api> - Acceptance
      3. <https://virtserver.swaggerhub.com/mhiggins-sa/payee-api/1.0.0> - Mock
      4. <http://localhost:7071/api/> - Locally running provider (see provider section for details on how to run locally)
