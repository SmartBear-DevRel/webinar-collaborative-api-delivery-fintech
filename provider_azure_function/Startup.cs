using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using SmartBearCoin.CustomerManagement.Services;

[assembly: FunctionsStartup(typeof(SmartBearCoin.CustomerManagement.Startup))]

namespace SmartBearCoin.CustomerManagement
{    
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            //builder.Services.AddHttpClient();

            // Add custom services
            builder.Services.AddSingleton<IValidationService>((s) => {
                return new ValidationService();
            });

            builder.Services.AddSingleton<IPayeeService>((s) => {
                return new PayeeService();
            });

        }
    }
}