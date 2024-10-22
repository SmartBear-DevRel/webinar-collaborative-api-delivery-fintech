# Searching for Payees

This [GET Get a list of Payees based on specified country and additional criteria.](https://smartbearcoin.portal.swaggerhub.com/payee-test-api/default/payees-api-v-1-0-0-prod#/Customer%20Management%20-%20Payees/getPayees) API method supports searching and identifying payees within a specified country. Search results will be sorted on highest confidence matching level.

## Search or Filter criteria

The following search criteria are supported to identify an payee registered within our customer management domain and within a specified country:

* Search based on `jurisdiction_identifier` and `jurisdiction_identifier_type` (e.g. company identifier in a specific country); examples are chamber of commerce number or KVK (NL), Siret (FR), CIF (ES), VAT Number (BE), Tax Number (US) and Company Registration Number (GB)
* Search based on name
* The following validation rules apply while providing the search criteria:
  * The `country_of_registration` is required and at least one of the other search criteria must be provided.
  * if `jurisdiction_identifier` is provided, then `jurisdiction_identifier_type` MUST also be specified.
  * `name` is required if either jurisdiction_identifier is not provided.

## Jurisdiction Identifier Types

The jurisdiction identifier types that are supported per country are described below:

| Country Code | Country  | Supported | Default
|--------------|----------|-----------|---------
|   BE    | Belgium | vat-number | vat-number
|   ES    | Spain | cif, nif | cif
|   FR    | France | siret | siret
|   GB    | United Kingdom | organization-number | organization-number
|   IE    | Ireland | organization-number |organization-number
|   IT    | Italy | fiscal-code | fiscal-code
|   NL    | Netherlands | chamber-of-commerce-number | chamber-of-commerce-number
|   PT    | Portugal | cif, nif | cif
|   US    | United States | tax-number, ssn | tax-number

## Sample Request

```cURL
curl --request GET \
  --url 'https://sbdevrel-fua-smartbearcoin-prd1.azurewebsites.net/api/payees?country_of_registration=IE&name=Easons' \
  --header 'Accept: application/json' \
  --header 'x-Authorization: '
```
