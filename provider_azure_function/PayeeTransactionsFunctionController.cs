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
    public class PayeeTransactionsFunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;

        public PayeeTransactionsFunctionController(IValidationService validationService, IPayeeService payeeService)
        {
            _validationService = validationService;
            _payeeService = payeeService;
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

            if(_payeeService.IsPayeeKnown(payeeId))
            {
                return new OkObjectResult(_payeeService.GetPayeeTransactions(payeeId));
            }
            
            return new NotFoundResult();
        }
    
    }
}
