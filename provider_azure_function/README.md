# SmartBearCoin Payments - Provider Azure Function

A .NET 7 based Azure Function implementation of the SmartBearCoin Payee API.

## Coding & Deployment - Provider

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

## Prerequisites

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

## Running locally

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
