using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using SmartBearCoin.CustomerManagement.Services;

namespace SmartBearCoin.CustomerManagement
{
    public class PayeeFunctionController
    {
        private readonly IValidationService _validationService;
        private readonly IPayeeService _payeeService;

        public PayeeFunctionController(IValidationService validationService, IPayeeService payeeService)
        {
            _validationService = validationService;
            _payeeService = payeeService;
        }
        
        [FunctionName("payee")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "payees/{payeeId:guid}")] HttpRequest req, string payeeId,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger to /payees/{payeeId}");

            var message = string.Format($"Details on payeeId: {payeeId} will be available shortly");
            log.LogInformation($"message: {message}");

            if(string.IsNullOrEmpty(payeeId))
            {
                return new BadRequestObjectResult("[payeeId] must be supplied in the request");
            }

            if(_payeeService.IsPayeeKnown(payeeId))
            {
                return new OkObjectResult(_payeeService.GetPayeeDetails(payeeId));
            }
            
            return new NotFoundResult();
        }
    
    }
}
