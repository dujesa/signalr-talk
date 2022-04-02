using System.Net.WebSockets;
using System.Text;

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

app.UseStaticFiles();

app.MapRazorPages();
app.UseRouting();

var _connections = new List<WebSocket>();
app.UseWebSockets(new() { KeepAliveInterval = TimeSpan.FromSeconds(30) });
app.UseEndpoints(endpoints =>
{
    endpoints.Map("/ws", async context =>
    {
        var buffer = new byte[1024 * 4];
        var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        _connections.Add(webSocket);

        var result = await webSocket.ReceiveAsync(new(buffer), CancellationToken.None);
        var i = 0;
        while (!result.CloseStatus.HasValue)
        {
            var message = Encoding.UTF8.GetBytes($"Message id: {i++}");
            foreach (var connection in _connections)
            {
                await connection.SendAsync(new(message, 0, message.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
            result = await webSocket.ReceiveAsync(new(buffer), CancellationToken.None);

            Console.WriteLine($"Received: {Encoding.UTF8.GetString(buffer[..result.Count])}");
        }

        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        _connections.Remove(webSocket);
    });
});


app.Run();
