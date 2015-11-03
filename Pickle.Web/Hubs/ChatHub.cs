using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using System.Collections.Generic;

namespace Pickle.Web.Hubs
{
    public class ChatHub : Hub
    {
        private static List<string> connectionIds = new List<string>();

        public override Task OnConnected()
        {
            connectionIds.Add(Context.ConnectionId);

            return base.OnConnected();
        }

        public void Send(string message)
        {
            var user = Context.User.Identity;

            Clients.Clients(connectionIds).broadcastMessage(user.Name, message);
        }
    }
}
