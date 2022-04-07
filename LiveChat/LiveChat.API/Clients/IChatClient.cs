using LiveChat.API.Hubs;

namespace LiveChat.API.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
