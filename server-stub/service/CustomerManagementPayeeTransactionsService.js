'use strict';


/**
 * Get the transaction history for a specific payee
 * Retrieve the payment history transactions for a particular payee
 *
 * payeeId String the SmartBearCoin customer managemenent reference identifier for the payee
 * authorization String Contains the OAuth 2.0 ClientCredentials or AuthorizationCode Bearer Token to make authenticated/authorized API calls.
 * transaction_from Date Retrieve only transaction that were completed since a given date. The value is a `date-time`. The ISO 8601 is applied.: time is in UTC, Example: `2017-04-08T19:05:36Z` (optional)
 * transaction_until Date Retrieve only transaction that were completed since a given date. The value is a `date-time`. The ISO 8601 is applied.: time is in UTC, Example: `2017-04-08T19:05:36Z` (optional)
 * no response value expected for this operation
 **/
exports.getPayeeTransactions = function(payeeId,authorization,transaction_from,transaction_until) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

