using LiveChat.API.Clients;
using Microsoft.AspNetCore.SignalR;

namespace LiveChat.API.Hubs
{
    public record ChatMessage(string User, string Content);


    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }
}
