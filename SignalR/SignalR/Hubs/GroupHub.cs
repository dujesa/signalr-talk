using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs
{
    public class GroupHub : Hub
    {
        public Task Join() => Groups.AddToGroupAsync(Context.ConnectionId, "group_name");
        public Task Leave() => Groups.RemoveFromGroupAsync(Context.ConnectionId, "group_name");

        public Task SendMessage() => Clients
            .Groups("group_name")
            .SendAsync("group_message", new Message(69, "Secret group message"));
    }
}
