using System.Collections.Generic;
using SmartBearCoin.CustomerManagement.Models.OpenAPI;

namespace SmartBearCoin.CustomerManagement.Models
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Data { get; set; }
        public PaginationLinks Links { get; set; }
    }
}