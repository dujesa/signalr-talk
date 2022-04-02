using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs
{
    public interface IClientInterface
    {
        Task ClientHook(Message data);
    }

    public class CustomHub : Hub<IClientInterface>
    {
        private readonly ILogger<CustomHub> _logger;

        public static int InvocationCounter { get; set; }
        public CustomHub(ILogger<CustomHub> logger) => _logger = logger;

        public void ServerHook(Message data)
        {
            _logger.LogInformation($"Receiving data: {data}, {Context.ConnectionId}");
        }

        public Task PingAll()
        {
            //barbarski nacin genericka implementacija nam brani koristenej => return Clients.All.SendAsync("ClientHook", new(96, "Ping all!"));
            return Clients.All.ClientHook(new(++InvocationCounter, "Ping all!"));
        }

        public Task PingSelf()
        {
            return Clients.Caller.ClientHook(new(++InvocationCounter, "Ping all!"));
        }

        //Renameanje metode huba && returnanje Message-a iz nje direktno
        [HubMethodName("direct_invocation")]
        public Message InvokableFunction()
        {
            return new Message(++InvocationCounter, $"Data returned from {nameof(InvokableFunction)}");
        }

        //Hookovi za on conected/disconnected evente
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
