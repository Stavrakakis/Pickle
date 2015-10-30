using System.Collections.Generic;
using IdentityServer3.Core.Models;

namespace Pickle.Api.Configuration
{
    public class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            return new[]
            {
                // standard OpenID Connect scopes
                StandardScopes.OpenId,
                StandardScopes.ProfileAlwaysInclude,
                StandardScopes.EmailAlwaysInclude,
            };
        }
    }
}