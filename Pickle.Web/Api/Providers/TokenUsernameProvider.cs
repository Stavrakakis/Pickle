using Microsoft.AspNet.Http;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Pickle.Web.Api.Providers
{
    public class TokenUsernameProvider : IUsernameProvider
    {
        private readonly IHttpContextAccessor contextAccessor;
        private readonly string usernameClaim = "given_name";

        public TokenUsernameProvider(IHttpContextAccessor contextAccessor)
        {
            this.contextAccessor = contextAccessor;
        }

        public Task<string> GetUsername()
        {
            var context = this.contextAccessor.HttpContext;

            if (context.User == null)
            {
                throw new InvalidOperationException("There is no User in the current context");
            }
            
            var claimsPrincipal = (context.User as ClaimsPrincipal);

            if (!claimsPrincipal.HasClaim(c => c.Type == usernameClaim))
            {
                throw new InvalidOperationException("There is no given_name claim in the current claims principal");
            }
            
            var name = claimsPrincipal.FindFirst(usernameClaim).Value;

            return Task.FromResult(name);
        }
    }
}
