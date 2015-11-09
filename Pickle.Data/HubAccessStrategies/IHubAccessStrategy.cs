using Pickle.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pickle.Data.HubAccessStrategies
{
    public interface IHubAccessStrategy
    {
        /// <summary>
        /// Checks if a user can access a specific hub according to this particular access strategy
        /// </summary>
        /// <param name="username">The username to check</param>
        /// <returns>True if the user has access according to this particular access strategy</returns>
        Task<bool> UserCanAccessHub(string username);
    }
}
