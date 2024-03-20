namespace SmartBearCoin.CustomerManagement.Models
{
    public class SimpleValidationResult
    {
        public bool? Result { get; set; }
        public string? ErrorType { get; set; }
        public string? Details { get; set; }
    }
}