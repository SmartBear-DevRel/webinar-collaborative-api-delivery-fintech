using System.Diagnostics;
using Polly;
using Polly.Retry;

public class TemporaryAzureFunctionsApplication : IAsyncDisposable
{
    private readonly Process _application;
    private static readonly HttpClient HttpClient = new HttpClient();

    private TemporaryAzureFunctionsApplication(Process application)
    {
        _application = application;
    }

    public static async Task<TemporaryAzureFunctionsApplication> StartNewAsync(DirectoryInfo projectDirectory)
    {
        int port = 7071;
        Process app = StartApplication(port, projectDirectory);
        await WaitUntilTriggerIsAvailableAsync($"http://localhost:{port}/");

        return new TemporaryAzureFunctionsApplication(app);
    }

    private static Process StartApplication(int port, DirectoryInfo projectDirectory)
    {
        var appInfo = new ProcessStartInfo("func", $"start --port {port} --csharp")
        {
            UseShellExecute = false,
            CreateNoWindow = true,
            WorkingDirectory = projectDirectory.FullName
        };

        var app = new Process { StartInfo = appInfo };
        app.Start();
        return app;
    }

    private static async Task WaitUntilTriggerIsAvailableAsync(string endpoint)
    {
        AsyncRetryPolicy retryPolicy =
                Policy.Handle<Exception>()
                      .WaitAndRetryForeverAsync(index => TimeSpan.FromMilliseconds(500));

            PolicyResult<HttpResponseMessage> result =
                await Policy.TimeoutAsync(TimeSpan.FromSeconds(30))
                            .WrapAsync(retryPolicy)
                            .ExecuteAndCaptureAsync(() => HttpClient.GetAsync(endpoint));

            if (result.Outcome == OutcomeType.Failure)
            {
                throw new InvalidOperationException(
                    "The Azure Functions project doesn't seem to be running, "
                    + "please check any build or runtime errors that could occur during startup");
            }
    } 

    public ValueTask DisposeAsync()
    {
        if (!_application.HasExited)
        {
            _application.Kill(entireProcessTree: true);
        }

        _application.Dispose();
        return ValueTask.CompletedTask;
    }
}