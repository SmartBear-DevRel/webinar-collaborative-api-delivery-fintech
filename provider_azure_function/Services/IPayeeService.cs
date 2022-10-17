
using SmartBearCoin.CustomerManagement.Models;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;

namespace SmartBearCoin.CustomerManagement.Services
{
    public interface IPayeeService
    {
        PagedResult<Payee> GetPayees(string country_code, string jurisdiction_identifier, string jurisdiction_identifier_type, string name);
        Payee GetPayeeDetails(string payeeId);
        PagedResult<Transaction> GetPayeeTransactions(string payeeId);
        bool IsPayeeKnown(string payeeId);
    }
}