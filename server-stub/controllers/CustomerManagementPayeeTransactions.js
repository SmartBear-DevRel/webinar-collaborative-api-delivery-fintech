'use strict';

var utils = require('../utils/writer.js');
var CustomerManagementPayeeTransactions = require('../service/CustomerManagementPayeeTransactionsService');

module.exports.getPayeeTransactions = function getPayeeTransactions (req, res, next, payeeId, authorization, transaction_from, transaction_until) {
  CustomerManagementPayeeTransactions.getPayeeTransactions(payeeId, authorization, transaction_from, transaction_until)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
