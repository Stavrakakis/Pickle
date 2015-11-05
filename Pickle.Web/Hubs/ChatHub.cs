using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;
using Pickle.Web.Api.Providers;

namespace Pickle.Web.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IChatHubClient>
    {
        private static List<string> connectionIds = new List<string>();
        private readonly IUsernameProvider usernameProvider;

        public ChatHub(IUsernameProvider usernameProvider)
        {
            this.usernameProvider = usernameProvider;
        }

        public override Task OnConnected()
        {
            connectionIds.Add(Context.ConnectionId);

            return base.OnConnected();
        }

        public async void Send(string channelId, string message)
        {
            var username = await this.usernameProvider.GetUsername();

            Clients.Clients(connectionIds).BroadcastMessage(username, message);
        }
    }
}
