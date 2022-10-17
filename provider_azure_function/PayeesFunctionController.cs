using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SmartBearCoin.CustomerManagement.Services;
using SmartBearCoin.CustomerManagement.Models;

namespace SmartBearCoin.CustomerManagement
{
    public class FunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;

        public FunctionController(IValidationService validationService, IPayeeService payeeService)
        {
            _validationService = validationService;
            _payeeService = payeeService;
        }
        
        [FunctionName("payees")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var validationResult = _validationService.ValidateQueryParameters(req.Query);

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);

            if (validationResult.Result == false)
            {
                var problemResponse = _validationService.GenerateValidationProblem(validationResult, "400");
                return new BadRequestObjectResult(problemResponse);
            }

            //string responseMessage = "Payees will soon be returned here!";

            return new OkObjectResult(_payeeService.GetPayees(req.Query["country_of_registration"], req.Query["jurisdiction_identifier"], req.Query["jurisdiction_identifier_type"], req.Query["name"]));
        }
    
    }
}
