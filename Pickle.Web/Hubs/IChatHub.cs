using System;

namespace Pickle.Web.Hubs
{
    public interface IChatHubClient
    {
        void BroadcastMessage(string hubId, string channelId, string username, string message, DateTime createdDate);
    }
}
