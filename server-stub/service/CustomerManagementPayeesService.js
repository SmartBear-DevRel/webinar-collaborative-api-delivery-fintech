'use strict';


/**
 * Get the details for a specific payee
 * Retrieve the full detailed response of a known payee based on it's SmartBearCoin customer managemenent reference identifier.
 *
 * payeeId String the SmartBearCoin customer managemenent reference identifier for the payee
 * authorization String Contains the OAuth 2.0 ClientCredentials or AuthorizationCode Bearer Token to make authenticated/authorized API calls.
 * no response value expected for this operation
 **/
exports.getPayeeById = function(payeeId,authorization) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a list of Payees based on specified country and additional criteria
 * This API method supports searching and identifying payees within a specified country. Search results will be sorted on highest confidence matching level.  #### Search/Filter criteria  The following search criteria are supported to identify an payee registered within our customer management domain and within a specified country: - search based on the 9 digit unique duns number; DUNS is abbreviation of data universal numbering system issued by Dun & Bradstreet - search based on jurisdiction identifier and type (e.g. company identifier in a specific country); examples are chamber of commerce number or KVK (NL), Siret (FR), CIF (ES), VAT Number (BE), Tax Number (US) and Company Registration Number (GB) - search based on name - search based on name and address   - address search criteria are postalCode, city, region and address line (street, house number, house number addition, building name)  The following validation rules apply while providing the search criteria: - the `country_of_registration` is required   - at least one of the other search criteria must be provided - if `duns_number` is provided, no other criteria are allowed - if `jurisdiction_identifier` is provided, no other criteria are allowed - the `name` is required if either of `duns_number` or `jurisdiction_identifier` is not provided  #### Jurisdiction Identifier types   The jurisdiction identifier types that are supported per country, and default applied if not explicitly provided are as detailed below.   | Country Code | Country  | Supported | Default | |--------------|----------|-----------|---------|         |   BE    |Belgium|vat-number|vat-number|         |   ES    |Spain|cif, nif|cif| |   FR    |France|siret|siret| |   GB    |United Kingdom|organization-number|organization-number| |   IE    |Ireland|organization-number|organization-number| |   IT    |Italy|fiscal-code|fiscal-code| |   NL    |Netherlands|chamber-of-commerce-number|chamber-of-commerce-number| |   PT    |Portugal|cif, nif|cif| |   US    |United States|tax-number, ssn|tax-number|  #### Pagination & Sorting This resource collection API supports both pagination and sorting of returned resources. Please refer to the our [**API Standards & Guidelines**](https://github.com/SmartBear/api-standards-and-guidelines#pagination) to find out how to use the `page`, `page_size`, and `sort` request parameters to sort or paginate the returned payees. 
 *
 * country_of_registration String The country in which the legalentity is registered, expressed in official (ISO) two-letter country code.
 * authorization String Contains the OAuth 2.0 ClientCredentials or AuthorizationCode Bearer Token to make authenticated/authorized API calls.
 * jurisdiction_identifier String Search with unique jurisdiction identifier. The complete identifier value must be provided. (optional)
 * jurisdiction_identifier_type String Filter by jurisdiction type, if not provided the type will be defaulted based upon the `country_of_registration`.              (optional)
 * name String Search with company/trading name (_Like_ Search). Required if `jurisdiction_identifier` is not provided. At least 2 characters must be provided.  (optional)
 * page Integer Requests a specific page number to retrieve. (optional)
 * sort List List attribute names that must be sorted, separated by commas.  Sorting in ascending order by default; field names appended with the minus sign (-) are sorted in descending order. Attributes that can be used for sorting are:   - name  (optional)
 * no response value expected for this operation
 **/
exports.getPayees = function(country_of_registration,authorization,jurisdiction_identifier,jurisdiction_identifier_type,name,page,sort) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

