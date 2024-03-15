using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Collections.Specialized;
using SmartBearCoin.CustomerManagement.Models;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;

namespace SmartBearCoin.CustomerManagement.Services
{
    public interface IValidationService
    {
        SimpleValidationResult ValidateQueryParameters(NameValueCollection queryParameters);
        Problem GenerateValidationProblem(SimpleValidationResult validationResults, string code);
    }
}