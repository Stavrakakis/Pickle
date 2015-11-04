using System.Threading.Tasks;

namespace Pickle.Web.Api.Providers
{
    public interface IUsernameProvider
    {
        Task<string> GetUsername();
    }
}
