'use strict';

var utils = require('../utils/writer.js');
var CustomerManagementPayees = require('../service/CustomerManagementPayeesService');

module.exports.getPayeeById = function getPayeeById (req, res, next, payeeId, authorization) {
  CustomerManagementPayees.getPayeeById(payeeId, authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPayees = function getPayees (req, res, next, country_of_registration, authorization, jurisdiction_identifier, jurisdiction_identifier_type, name, page, sort) {
  CustomerManagementPayees.getPayees(country_of_registration, authorization, jurisdiction_identifier, jurisdiction_identifier_type, name, page, sort)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
