using System.Collections.Generic;
using IdentityServer3.Core.Models;

namespace Pickle.Api.Configuration
{
    public class Clients
    {
        public static List<Client> Get()
        {
            return new List<Client>
            {

                new Client
                {
                    ClientName = "Pickle",
                    ClientId = "pickle",

                    // human involved
                    Flow = Flows.Hybrid,

                    RedirectUris = new List<string>
                    {
                        "https://localhost:44303/",
                    },
                    
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "email",
                        "profile"
                    }
                }
            };
        }
    }
}