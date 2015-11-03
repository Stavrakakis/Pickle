using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Linq;
using Microsoft.AspNet.Http;

namespace Pickle.Web.Middleware
{
    public static class ApiHelpers
    {
        public static void AddBearerTokenFromCookie(this HttpRequestMessage request, HttpContext context)
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("bearer", GetTokenFromContext(context));
        }

        public static string GetTokenFromContext(HttpContext context)
        {
            var token = context.User.Claims.FirstOrDefault(claim => claim.Type == "token");

            if (token == null)
            {
                throw new UnauthorizedAccessException();
            }

            return token.Value;
        }
    }
}
