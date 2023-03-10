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

* A [PactFlow](https://PactFlow.io) account (create a [free account](https://PactFlow.io/pricing/)).
* A [SwaggerHub](https://swaggerhub.com) account (create a [free account](https://try.smartbear.com/)).
  * For the [SwaggerHub/PactFlow integration](https://swagger.io/tools/swaggerhub/integrations/PactFlow/), you will need a team /enterprise account, to create private API's, or you can use the integration for the first 14 day trial of enterprise.
* A [ReadyAPI](https://swaggerhub.com) account (create a [free 14 day trial account](https://smartbear.com/product/ready-api/free-trial)).

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

1. TODO

### Development, Testing & Virtualisation - Provider

1. Import OpenAPI from SwaggerHub to ReadyAPI
2. Create ReadyAPI Functional Tests
3. Test ReadyAPI tests against virt-server locally
4. Test ReadyAPI tests against virt-server locally with test runner
5. Test ReadyAPI tests against virt-server locally with test runner docker
6. Test ReadyAPI tests against virt-server in CI
7. Upload to Provider Contract to PactFlow


### Coding & Deployment - Provider


### Coding & Deployment - Consumer


### Exploration


### Enhanced visiblity