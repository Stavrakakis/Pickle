namespace Pickle.Web.Hubs
{
    public interface IChatHubClient
    {
        void BroadcastMessage(string username, string message);
    }
}
