using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

namespace SignalR.Hubs
{
    public interface IGroupInterface
    {
        Task GroupHook(Message data);
    }

    public class GroupHub : Hub<IGroupInterface>
    {
        public Task Join() => Groups.AddToGroupAsync(Context.ConnectionId, "group_name");
        public Task Leave() => Groups.RemoveFromGroupAsync(Context.ConnectionId, "group_name");

        public Task SendMessage() => Clients.Group("group_name")
            .GroupHook(new Message(69, "Secret group message"));
    }
}
