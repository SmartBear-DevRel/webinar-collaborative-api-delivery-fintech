using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using SmartBearCoin.CustomerManagement.Services;
using System.Text.Json;

namespace SmartBearCoin.CustomerManagement
{
    public class PayeesFunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;
        private readonly ILogger<PayeesFunctionController> _logger;
        private readonly JsonSerializerOptions _serializerOptions;

        public PayeesFunctionController(IValidationService validationService, IPayeeService payeeService, ILogger<PayeesFunctionController> logger, JsonSerializerOptions serializerOptions)
        {
            _validationService = validationService;
            _payeeService = payeeService;
            _logger = logger;
            _serializerOptions = serializerOptions;
        }
        
        [Function(nameof(PayeesFunctionController))]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees")] HttpRequestData req)
        {
            _logger.LogInformation("'{msg}'","C# HTTP trigger function processed a request.");

            var queryParameters = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
            var validationResult = _validationService.ValidateQueryParameters(queryParameters);

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);

            if (validationResult.Result == false)
            {
                var problemResponse = _validationService.GenerateValidationProblem(validationResult, "400");
                var errorResponse = req.CreateResponse(HttpStatusCode.BadRequest);
                await errorResponse.WriteStringAsync(JsonSerializer.Serialize(problemResponse, _serializerOptions));
                
                return errorResponse;
            }

            var response = req.CreateResponse(HttpStatusCode.OK);
            await response.WriteStringAsync(
                JsonSerializer.Serialize(
                    _payeeService.GetPayees(
                        queryParameters["country_of_registration"] ?? string.Empty, 
                        queryParameters["jurisdiction_identifier"] ?? string.Empty, 
                        queryParameters["jurisdiction_identifier_type"] ?? string.Empty, 
                        queryParameters["name"] ?? string.Empty
                    ), 
                    _serializerOptions
                ));

            return response;
        }
    
    }
}
