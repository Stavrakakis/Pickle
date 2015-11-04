using Microsoft.AspNet.Hosting;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Pickle.Web.Api.Providers
{
    public class TokenUsernameProvider : IUsernameProvider
    {
        private readonly IHttpContextAccessor contextAccessor;

        public TokenUsernameProvider(IHttpContextAccessor contextAccessor)
        {
            this.contextAccessor = contextAccessor;
        }

        public Task<string> GetUsername()
        {
            var context = this.contextAccessor.HttpContext;

            if (context.User == null) {
                throw new Exception();
            }

            var c = (context.User as ClaimsPrincipal);
            var name = c.FindFirst("given_name").Value;

            return Task.FromResult(name);
        }
    }
}
