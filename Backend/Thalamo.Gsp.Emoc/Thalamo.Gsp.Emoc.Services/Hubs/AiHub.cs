using Microsoft.AspNetCore.SignalR;

namespace Thalamo.Gsp.Emoc.Services.Hubs
{
    public class AiHub : Hub
    {
        // Client can call this to join a specific group if needed, 
        // but for now we'll just use the ConnectionId directly.
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
