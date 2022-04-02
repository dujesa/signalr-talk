using System.Threading.Channels;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//obican queue za poruke (unbounded da nemam ogranicenje broja simultanih readera i writera)
var _channel = Channel.CreateUnbounded<string>();

app.UseEndpoints(endpoints =>
{
    endpoints.Map("/send", async context =>
    {
        if (context.Request.Query.TryGetValue("msg", out var message))
        {
            Console.WriteLine($"Message to send: {message}");
            await _channel.Writer.WriteAsync(message);
        }

        context.Response.StatusCode = 200;
    });
});

//dodajem custom middleware za citanje zapisane poruke iz channela i dodajem header na poruku i kreiram response
app.Use(async (context, next) =>
{
    if (context.Request.Path.ToString().Equals("/sse"))
    {
        var response = context.Response;
        response.Headers.Add("Content-Type", "text/event-stream");

        //flushanje podataka nazad; sa \r\r se delimitiraju podaci u EventSource protokolu kojeg browser mora implementirat
        await response.WriteAsync("event: custom\r");
        await response.WriteAsync("data: custom event data\r\r");
        await response.Body.FlushAsync();

        while (await _channel.Reader.WaitToReadAsync())
        {
            //kada imamo podatke u channelu procitamo i posaljemo nazad
            var message = await _channel.Reader.ReadAsync();
            Console.WriteLine($"Sending message: {message}");
            await response.WriteAsync($"data: {message}\r\r");

            await response.Body.FlushAsync();
        }
    }

    await next();
});


app.MapRazorPages();

app.Run();
