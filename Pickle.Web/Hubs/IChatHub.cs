namespace Pickle.Web.Hubs
{
    public interface IChatHubClient
    {
        void BroadcastMessage(string channelId, string username, string message);
    }
}
