# Workshop & Webinar showcasing a collaborative API Delivery Scenario

A repo storing assets related to webinar demonstrating a collaborative API design and delivery journey using SwaggerHub, ReadyAPI, and PactFlow

# Tooling integration - SmartBear API Platform

In this guide, you'll learn how to use the SmartBear API Platform, to add improve confidence and add visibility to your design first API development workflow.

- [PactFlow](https://PactFlow.io/)
- [SwaggerHub](https://swaggerhub.com/)
- [ReadyAPI](https://smartbear.com/product/ready-api/)
- [SwaggerHub Explore](https://swagger.io/tools/swaggerhub-explore/)
<!-- - [AlertSite]() -->
<!-- - [BugSnag]() -->

## Benefits

SmartBear's API Platform tools can be combined to increase the quality of your design-first API development workflow, and help navigate the complexity of microservices rollout.

SwaggerHub is foundation of a repeatable process for API Development, providing a secure collaborative environment for your API design process:

1. It unifies teams around a single source of truth - **the OAS** - and enables standardisation across your services
1. Allows teams to work **independently**
2. **Unlocks automation** such as code-generation and mock services

PactFlow brings increased visibility into how consumers use your API, enabling:

1. API consumer and API producer development teams to work in independently and **safely**
2. **Prevent breaking changes** to your API and releasing an incompatible API consumer
3. A reduction in the need for **API versioning**, avoiding the need to create and maintain multiple versions of an API, and communicating the change to consumers.

<!-- ReadyAPI brings:

1. TODO
2. TODO
3. TODO

SwaggerHub Explore brings:

1. TODO
2. TODO
3. TODO -->

Together, they allow faster feedback cycles from design through to development, test and release.

## _Pre-requisites:_

To use this feature, you will need:

- A [PactFlow](https://PactFlow.io) account (create a [free account](https://PactFlow.io/pricing/)).
- A [SwaggerHub](https://swaggerhub.com) account (create a [free account](https://try.smartbear.com/)).
  - For the [SwaggerHub/PactFlow integration](https://swagger.io/tools/swaggerhub/integrations/PactFlow/), you will need a team /enterprise account, to create private API's, or you can use the integration for the first 14 day trial of enterprise.
- A [ReadyAPI](https://swaggerhub.com) account (create a [free 14 day trial account](https://smartbear.com/product/ready-api/free-trial)).

## The FinTech Scenario

![SmartBearCoin](https://user-images.githubusercontent.com/19932401/224381085-3e54afaf-919b-4c49-8921-0b3b829bf692.png)

Our company _SmartBearCoin_ is expanding to offer services across the wider European region and thus our Payments Domain (business capability) are extending our payment processing sub-capability to cater for cross border payments.

**The Business Requirements**

The Payments capability has requested the following from Customer Management capability:

>The ability to be able to retrieve customer information to help them have up-to-date and accurate payee information at the point to issuing a cross border payment. It was also mentioned was the need to obtain payment transaction summary information for payees but the ask was not very clear 😕

## Overview

- Establish the business requirements and set the scene ​
- Enforce API design standards to meet regulatory requirements ​
- Use SwaggerHub to unlock the advantages of the design-first approach for APIs​
- Use ReadyAPI for integrated API testing (functional/security/perf)​
- Use ReadyAPI setup rich API virtualization ​
- Use PactFlow Implement bi-directional API contract testing ​
- Leverage API definitions and artifacts for DevOps automation​
- Run through provider and client deployments with quality-gated CI/CD flows​
- Demonstrate how we can safely catch breaking changes​

### Deliverables

- FrontEnd
  - Team: Financial Payments Team
  - Tech: React / TypeScript
  - Deployment: GitHub Actions / Netlify
  - Tools Used:
    - SwaggerHub
    - Pact
    - PactFlow
    <!-- - AlertSite -->
    <!-- - BugSnag -->
  
- BackEnd
  - Team: Customer Management Team
  - Tech: .NET Core 6 / Azure Functions
  - Deployment: GitHub Actions / Azure
  - Tools Used:
    - SwaggerHub
    - ReadyAPI
    - PactFlow
    <!-- - AlertSite -->
    <!-- - BugSnag -->
  
![End-Deliverable](https://user-images.githubusercontent.com/19932401/224380804-3b368011-06a4-4a10-8737-5ec6c1dbce8e.png)

## Integration Guide

![shub_webinar_phase1](https://user-images.githubusercontent.com/19932401/224374059-052f449b-bd7a-429e-9780-a7908cfd613f.jpg)

### Requirements & Design

![Design phase](https://user-images.githubusercontent.com/19932401/224380802-38a5565b-8fbc-428f-9f41-a49e77d2c3d7.png)

1. Create your API definition in SwaggerHub
   1. <https://support.smartbear.com/swaggerhub/docs/apis/creating-api.html>
2. Enable AutoMocking to ensure you have a VirtServer available for users to explore, prior to development work beginning.
   1. <https://support.smartbear.com/swaggerhub/docs/integrations/api-auto-mocking.html>
3. Utilise Domains to utilise libraries of common components used across your business
   1. <https://support.smartbear.com/swaggerhub/docs/domains/index.html>
4. Invite your team members to collaborate on your API
   1. <https://support.smartbear.com/swaggerhub/docs/organizations/working-with/add-delete-users.html#add>
5. Collaborate via comments
   1. <https://support.smartbear.com/swaggerhub/docs/collaboration/comments.html>

### Testing & Virtualisation - Provider

![Testing Provider](https://user-images.githubusercontent.com/19932401/224380799-32486613-8f7c-47f2-83c1-e55060fe4fa0.png)

1. Import OpenAPI from SwaggerHub to ReadyAPI
   1. <https://support.smartbear.com/readyapi/docs/integrations/swagger.html>
2. Create ReadyAPI Functional Tests in the newly created Project
   1. <https://support.smartbear.com/readyapi/docs/functional/creating.html#from-project>
3. Test ReadyAPI tests against VirtServer locally in ReadyAPI
   1. <https://support.smartbear.com/readyapi/docs/functional/running/case.html>
4. Test ReadyAPI tests against VirtServer locally with test runner GUI
   1. <https://support.smartbear.com/readyapi/docs/functional/running/automating/gui.html>
5. Test ReadyAPI tests against VirtServer locally with test runner docker image
   1. <https://support.smartbear.com/readyapi/docs/integrations/docker/soapui.html>
6. Test ReadyAPI tests against VirtServer in CI
   1. <https://github.com/SmartBear-DevRel/webinar-collaborative-api-delivery-fintech/blob/aca0b64b070478693283bd14df031d014167b9b6/.github/workflows/ProviderCI.yml#L71-L80>
7. Upload to Provider Contract to PactFlow
   1. <https://docs.pactflow.io/docs/bi-directional-contract-testing/contracts/oas#publishing-the-provider-contract--results-to-pactflow>

### Coding & Deployment - Provider

Here we implement the API (as per design) by manually creating an Azure Function using .NET 6.0. To speed up the creation and to ensure we conform with the schemas, we'll use SwaggerHub code generation capabilities.

![Provider Code](https://user-images.githubusercontent.com/19932401/224380794-2e6aa347-d3a0-4510-9a00-1544c71180b5.png)

1. In SwaggerHub export a _server stub_ from the OpenAPI definition (_Export > Server Stub > aspnetcore_)
2. Extract the models into the _Models > OpenAPI_ folder of the `provider_azure_function` solution
3. Ensure all paths defined in the OpenAPI definition are implemented by an Azure Function controller
4. Build out the appropriate validation services as required
5. Ensure all required infrastructure is contained in the Azure Resource Manager template (`azuredeploy.json`)
6. Build and commit the project

![Provider Flow](https://user-images.githubusercontent.com/19932401/224380790-9ccbf134-a49e-4a0c-af54-31ebb1ed86b7.png)

7. Kick off the `Provider-API-AzureFunction-CI` GitHub action which covers the following:
    - checks out and builds
    - tests using ReadyAPI project created above
    - deploys infra to azure
    - adds provider contract to PactFlow leveraging the `can-i-deploy` check

If you want to run and edit the provider locally, then take note of the following:

#### Prerequisites

- VSCode, Visual Studio or other IDE capable of running .NET 7 projects
- .NET 7
- Azure Functions Core Tools (>= v4.0.5571)
- ngrok

The project was created using VSCode with the following extensions installed:

- [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)

Ensure that your development certs are trusted (required for debugging)

```
dotnet dev-certs  https --trust
```

#### Running locally

Clone the repo and ensure the project builds

```
dotnet build
```

Setup your `local.settings.json` file. Here is a sample settings configuration:

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
  },
  "Host": {
    "CORS": "*"
  }
}
```

###  Coding & Deployment - Consumer

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
4. `npm run start` - Run the website locally
   1. You can update the endpoint used for the provider, by setting the environment variable `REACT_APP_API_BASE_URL`
      1. <https://sbdevrel-fua-smartbearcoin-prd1.azurewebsites.net/api> - Production
      2. <https://sbdevrel-fua-smartbearcoin-acc1.azurewebsites.net/api> - Acceptance
      3. <https://virtserver.swaggerhub.com/mhiggins-sa/payee-api/1.0.0> - Mock
      4. <http://localhost:7071/api/> - Locally running provider (see provider section for details on how to run locally)

###  Exploration

You can utilise [SwaggerHub Explore](https://swagger.io/tools/swaggerhub-explore/) to see how an API behaves in the real world, whether the API is deployed to an environment, or running locally on your machine. It's free to sign in with your SwaggerHub account.

#### Explore a live API

1. Visit https://explore.swaggerhub.com/
2. Copy the following URL and paste it into the address bar
   1. `https://sbdevrel-fua-smartbearcoin-prd1.azurewebsites.net/api/payees?country_of_registration=IE&jurisdiction_identifier=06488522&jurisdiction_identifier_type=chamber-of-commerce-number`
3. Press `Send`
4. Congrats 🎉 you just send your first request in Explore.

#### Explore a local API

1. Visit https://explore.swaggerhub.com/
2. Click on the network connection icon
3. Select Local connection
4. Download the relevant explore local execution agent for your platform (Windows/Linux/MacOS)
5. Run the local execution agent
6. Run the provider code as described above in the `Coding & Deployment - Provider` so that your API is locally running
7. Use `cURL` and check you can call the API correctly
   1. `curl http://localhost:7071/api/payees?country_of_registration=IE&jurisdiction_identifier=06488522&jurisdiction_identifier_type=chamber-of-commerce-number`
8. Copy the following URL and paste it into the address bar
   1. `http://localhost:7071/api/payees?country_of_registration=IE&jurisdiction_identifier=06488522&jurisdiction_identifier_type=chamber-of-commerce-number`
9.  Press `Send`
10. Congrats 🎉 you just send your first request to a locally running service with Explore.