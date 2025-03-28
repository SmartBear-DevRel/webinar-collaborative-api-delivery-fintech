using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using SmartBearCoin.CustomerManagement.Services;
using System.Text.Json;
using Azure.Core.Serialization;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;
using SmartBearCoin.CustomerManagement.Models;

namespace SmartBearCoin.CustomerManagement
{
    public class PayeesFunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;
        private readonly ILogger<PayeesFunctionController> _logger;
        private readonly ObjectSerializer _objectSerializer;

        public PayeesFunctionController(IValidationService validationService, IPayeeService payeeService, ILogger<PayeesFunctionController> logger, ObjectSerializer objectSerializer)  
        {
            _validationService = validationService;
            _payeeService = payeeService;
            _logger = logger;
            _objectSerializer = objectSerializer;
        }
        
        [Function(nameof(PayeesFunctionController))]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees")] HttpRequestData req)
        {
            _logger.LogInformation("'{msg}'","C# HTTP trigger function processed a request.");

            var queryParameters = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
            var validationResult = _validationService.ValidateQueryParameters(queryParameters);

            if (validationResult.Result == false)
            {
                var problemResponse = _validationService.GenerateValidationProblem(validationResult, "400");

                var errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await errorResponse.WriteAsJsonAsync(problemResponse, _objectSerializer);
                
                return errorResponse;
            }

            var payees = _payeeService.GetPayees(
                queryParameters["country_of_registration"] ?? string.Empty, 
                queryParameters["jurisdiction_identifier"] ?? string.Empty, 
                queryParameters["jurisdiction_identifier_type"] ?? string.Empty, 
                queryParameters["name"] ?? string.Empty
            );

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteAsJsonAsync(payees, _objectSerializer);    

            return response;
        }
    
    }
}
