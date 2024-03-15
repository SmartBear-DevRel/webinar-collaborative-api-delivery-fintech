using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SmartBearCoin.CustomerManagement.Services;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services => {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddSingleton<IValidationService>((s) => {
            return new ValidationService();
        });
        services.AddSingleton<IPayeeService>((s) => {
            return new PayeeService();
        });
    })
    .Build();

host.Run();
