using System.Net;
using System.Text.Json;
using Azure.Core.Serialization;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using SmartBearCoin.CustomerManagement.Services;

namespace SmartBearCoin.CustomerManagement
{
    public class PayeeFunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;
        private readonly ILogger<PayeesFunctionController> _logger;
        private readonly ObjectSerializer _objectSerializer;

        public PayeeFunctionController(IValidationService validationService, IPayeeService payeeService, ILogger<PayeesFunctionController> logger, ObjectSerializer objectSerializer)  
        {
            _validationService = validationService;
            _payeeService = payeeService;
            _logger = logger;
            _objectSerializer = objectSerializer;
        }
        
        [Function(nameof(PayeeFunctionController))]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees/{payeeId:guid}")] HttpRequestData req, string payeeId)
        {
            _logger.LogInformation("'{msg}'","C# HTTP trigger to /payees/{payeeId}");

            var message = string.Format($"Details on payeeId: {payeeId} will be available shortly");
            _logger.LogInformation("message: '{msg}'", message);

            if(string.IsNullOrEmpty(payeeId))
            {
                var response = req.CreateResponse(HttpStatusCode.BadRequest);
                await response.WriteStringAsync("[payeeId] must be supplied in the request");

                return response;                
            }

            if(_payeeService.IsPayeeKnown(payeeId))
            {
                var response = req.CreateResponse(HttpStatusCode.OK);
                await response.WriteAsJsonAsync(_payeeService.GetPayeeDetails(payeeId), _objectSerializer);
                
                return response;                
            }
            
            return req.CreateResponse(HttpStatusCode.NotFound);
        }
    
    }
}
