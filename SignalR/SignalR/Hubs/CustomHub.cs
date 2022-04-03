using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs
{
    //predstavlja klijenta i njegove hook metode
    public interface IClientInterface
    {
        Task ClientHook(Message data);
    }

    public class CustomHub : Hub<IClientInterface>
    {
        private readonly ILogger<CustomHub> _logger;

        public static int InvocationCounter { get; set; }
        public CustomHub(ILogger<CustomHub> logger) => _logger = logger;

        public void ServerHook(Message message)
        {
            _logger.LogInformation($"Connection id: " +
                $"{message}, {Context.ConnectionId}");
            //pokazi kako se connection id mijenja iako mogu bit "logiran kao isti user" (refreshaj page)
        }

        public Task PingAll()
        {
            //barbarski nacin genericka implementacija nam brani koristenej => return Clients.All.SendAsync("ClientHook", new(96, "Ping all!"));
            return Clients.All.ClientHook(new(++InvocationCounter, "Ping all!"));
        }

        public Task PingSelf()
        {
            return Clients.Caller.ClientHook(new(++InvocationCounter, "Ping only me!"));
        }

        //Renameanje metode huba && returnanje Message-a iz nje direktno
        [HubMethodName("direct_invocation")]
        public Message InvokableFunction()
        {
            return new (++InvocationCounter, $"Data returned from {nameof(InvokableFunction)}");
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
