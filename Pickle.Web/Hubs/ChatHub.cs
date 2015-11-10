using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using Pickle.Web.Api.Providers;
using System;

namespace Pickle.Web.Hubs
{
    [Authorize]
    public class ChatHub : Hub<IChatHubClient>
    {
        private readonly IUsernameProvider usernameProvider;

        public ChatHub(IUsernameProvider usernameProvider)
        {
            this.usernameProvider = usernameProvider;
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public async void Send(string hubId, string channelId, string message, DateTime createdDate)
        {
            var username = await this.usernameProvider.GetUsername();

            Clients.All.BroadcastMessage(hubId, channelId, username, message, createdDate);
        }
    }
}
