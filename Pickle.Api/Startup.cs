using IdentityServer3.Core.Configuration;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Runtime;
using Microsoft.Owin.Security.Google;
using Owin;
using System.Security.Cryptography.X509Certificates;
using Pickle.Api.Configuration;

namespace Pickle.Api
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDataProtection();
            services.AddSignalR();
        }

        public void Configure(IApplicationBuilder app, IApplicationEnvironment env)
        {
            var certFile = env.ApplicationBasePath + "\\idsrv3test.pfx";

            app.Map("/identity", idsrvApp =>
            {
                idsrvApp.UseIdentityServer(new IdentityServerOptions
                {
                    SiteName = "Embedded IdentityServer",
                    SigningCertificate = new X509Certificate2(certFile, "idsrv3test"),

                    Factory = new IdentityServerServiceFactory()
                                .UseInMemoryUsers(Users.Get())
                                .UseInMemoryClients(Clients.Get())
                                .UseInMemoryScopes(Scopes.Get()),

                    AuthenticationOptions = new IdentityServer3.Core.Configuration.AuthenticationOptions
                    {
                        EnableLocalLogin = false,
                        IdentityProviders = ConfigureIdentityProviders
                    }
                });
            });
            
            app.UseSignalR();
        }

        private void ConfigureIdentityProviders(IAppBuilder app, string signInAsType)
        {
            app.UseGoogleAuthentication(new GoogleOAuth2AuthenticationOptions
            {
                AuthenticationType = "Google",
                Caption = "Sign-in with Google",
                SignInAsAuthenticationType = signInAsType,

                ClientId = "1002902363794-1b5sk8pb5ss2l6fhum2ep6f4b8v3g6ck.apps.googleusercontent.com",
                ClientSecret = "TYESgzOYcTrn8tu5kHAZenVK"
            });
        }
    }
}
