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

namespace SmartBearCoin.CustomerManagement
{
    public class PayeeTransactions
    {
        private readonly IValidationService _validationService;

        public PayeeTransactions(IValidationService validationService)
        {
            _validationService = validationService;
        }
        
        [FunctionName("payeeTransactions")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees/{payeeId:guid}/transactions")] HttpRequest req, string payeeId,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger to /payees/{payeeId}");

            var message = string.Format($"payeeId: {payeeId}");
            log.LogInformation($"message: no transactions");

            if(string.IsNullOrEmpty(payeeId))
            {
                return new BadRequestObjectResult("[payeeId] must be supplied in the request");
            }

            //string responseMessage = string.IsNullOrEmpty(name)
            //    ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
            //    : $"Hello, {name}. This HTTP triggered function executed successfully.";


            return new NoContentResult();
        }
    
    }
}
