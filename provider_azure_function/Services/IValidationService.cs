using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SmartBearCoin.CustomerManagement.Models;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;

namespace SmartBearCoin.CustomerManagement.Services
{
    public interface IValidationService
    {
        SimpleValidationResult ValidateQueryParameters(IQueryCollection queryParameters);
        Problem GenerateValidationProblem(SimpleValidationResult validationResults, string code);
    }
}