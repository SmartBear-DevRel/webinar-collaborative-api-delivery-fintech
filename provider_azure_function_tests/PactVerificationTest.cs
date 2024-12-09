using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using PactNet.Infrastructure.Outputters;
using PactNet.Output.Xunit;
using PactNet.Verifier;
using PactNet;
using Xunit.Abstractions;

namespace provider_azure_function_tests;

public class ProviderApiTests : IDisposable
{
    private string _providerUri { get; }
    private ITestOutputHelper _outputHelper { get; }
    private System.Threading.Tasks.Task<TemporaryAzureFunctionsApplication> _app { get; }

    public ProviderApiTests(ITestOutputHelper output)
    {
        _outputHelper = output;
        _providerUri = "http://localhost:7071/api";
        _app = TemporaryAzureFunctionsApplication.StartNewAsync(new DirectoryInfo("../../../../provider_azure_function"));
    }

    [Fact]
    public void EnsureProviderApiHonoursPactWithConsumer()
    {

        // Wait for the Azure Functions application to start
        _app.Wait(15000);
        System.Threading.Thread.Sleep(5000);

        // Arrange
        var config = new PactVerifierConfig
        {

            // NOTE: We default to using a ConsoleOutput,
            // however xUnit 2 does not capture the console output,
            // so a custom outputter is required.
            Outputters = new List<IOutput>
                            {
                                new XunitOutput(_outputHelper),
                                new ConsoleOutput()
                            },

            // Output verbose verification logs to the test output
            LogLevel = PactLogLevel.Information,
        };

        string providerName = "SmartBearCoin-Payee-Provider";
        IPactVerifier pactVerifier = new PactVerifier(providerName, config);
        string pactUrl = Environment.GetEnvironmentVariable("PACT_URL");

        pactVerifier.WithHttpEndpoint(new Uri(_providerUri))
        .WithFileSource(new FileInfo(pactUrl))
        .Verify();

    }

    #region IDisposable Support

    private bool _disposed = false; // To detect redundant calls

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {

            _app.Result.DisposeAsync().AsTask().Wait();
            _app.Dispose();
        }

        _disposed = true;
    }

    // This code added to correctly implement the disposable pattern.
    public void Dispose()
    {
        // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        Dispose(true);

        GC.SuppressFinalize(this);
    }

    #endregion
}