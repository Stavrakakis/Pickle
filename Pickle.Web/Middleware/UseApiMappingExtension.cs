using System;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNet.Builder;

namespace Pickle.Web.Middleware
{
    public static class UserApiMappingExtension
    {
        public static IApplicationBuilder UseApiMapping(this IApplicationBuilder app, ApiMappingOptions options)
        {
            if (string.IsNullOrWhiteSpace(options.MapFromUri))
            {
                throw new ArgumentNullException(nameof(options.MapFromUri));
            }

            if (string.IsNullOrWhiteSpace(options.MapToUri))
            {
                throw new ArgumentNullException(nameof(options.MapToUri));
            }

            app.Map(options.MapFromUri, application =>
            {
                application.Run(async (context) =>
                {
                    // EXTREMELY EXPERIMENTAL. This needs to be a fully featured proxy.
                    // it needs to handle all of the HTTP verbs correctly and parameters etc.
                    var baseApiPath = options.MapToUri;

                    var proxyPath = $"{baseApiPath}/{context.Request.Path}";

                    var request = new HttpRequestMessage(new HttpMethod(context.Request.Method), proxyPath);

                    if (options.UseBearerTokenFromCookie)
                    {
                        request.AddBearerTokenFromCookie(context);
                    }

                    var client = new HttpClient();
                    var response = await client.SendAsync(request);

                    response.Headers.CacheControl = new CacheControlHeaderValue { NoCache = true, NoStore = true };

                    await response.Content.CopyToAsync(context.Response.Body);
                });
            });

            return app;
        }
    }
}
