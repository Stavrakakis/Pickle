using System.Collections.Generic;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Authentication.OpenIdConnect;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNet.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.Mvc.Formatters;
using Microsoft.Data.Entity;
using Pickle.Data.EntityFramework.Context;
using Pickle.Web.Registration;
using Autofac;
using Autofac.Framework.DependencyInjection;
using AutoMapper;
using Pickle.Data.DataModels;
using Pickle.Data.Models;

namespace Pickle.Web
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            
            services.AddMvc()
                    .AddMvcOptions(options => {

                      var jsonOutputFormatter = new JsonOutputFormatter();
                      jsonOutputFormatter.SerializerSettings.ContractResolver =
                          new CamelCasePropertyNamesContractResolver();
                      options.OutputFormatters.Insert(0, jsonOutputFormatter);
                  });

            var connection = @"Server=(localdb)\v11.0;Database=Pickle;Trusted_Connection=True;";

            services.AddEntityFramework()
                    .AddSqlServer()
                    .AddDbContext<PickleContext>(o => o.UseSqlServer(connection));

            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
            });

            var builder = new ContainerBuilder();

            builder.RegisterModule(new AutofacModule());

            builder.Populate(services);

            var container = builder.Build();

            return container.ResolveOptional<IServiceProvider>();
        }

        public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider)
        {
            app.UseIISPlatformHandler();

            Mapper.Initialize(cfg =>
            {

                cfg.CreateMap<Hub, HubDataModel>();
                cfg.CreateMap<HubDataModel, Hub>();

                cfg.CreateMap<Channel, ChannelDataModel>();
                cfg.CreateMap<ChannelDataModel, Channel>();

                cfg.CreateMap<ChatMessage, ChatMessageDataModel>();
                cfg.CreateMap<ChatMessageDataModel, ChatMessage>();
            });

            Mapper.AssertConfigurationIsValid();

            //var hubRepository = serviceProvider.GetService<IRepository<Hub>>();
            //var channelRepository = serviceProvider.GetService<IRepository<Channel>>();
            //var messageRepository = serviceProvider.GetService<IRepository<ChatMessage>>();

            //EntityFrameworkSeeder.Seed(hubRepository, channelRepository, messageRepository).Wait();

            // really? still?
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap = new Dictionary<string, string>();

            app.UseCookieAuthentication(options =>
            {
                options.AuthenticationScheme = "Cookies";
                options.AutomaticAuthentication = true;
            });

            app.UseOpenIdConnectAuthentication(options =>
            {
                options.Authority = "https://localhost:44306/identity";
                options.ClientId = "pickle";
                options.ResponseType = "code id_token token";
                options.Scope.Add("openid");
                options.Scope.Add("email");
                options.Scope.Add("profile");
                options.RedirectUri = "https://localhost:44303/";
                options.SignInScheme = "Cookies";
                options.AutomaticAuthentication = true;


                options.Events = new OpenIdConnectEvents
                {
                    OnAuthenticationValidated = data =>
                    {
                        var incoming = data.AuthenticationTicket.Principal;
                        var id = new ClaimsIdentity("application", "given_name", "role");

                        id.AddClaim(incoming.FindFirst("sub"));
                        id.AddClaim(incoming.FindFirst("email"));
                        id.AddClaim(incoming.FindFirst("given_name"));
                        id.AddClaim(incoming.FindFirst("family_name"));
                        id.AddClaim(new Claim("access_token", data.ProtocolMessage.AccessToken));
                        id.AddClaim(new Claim("id_token", data.ProtocolMessage.IdToken));
                        id.AddClaim(new Claim("expires_at", DateTime.Now.AddSeconds(double.Parse(data.ProtocolMessage.ExpiresIn)).ToString()));

                        data.AuthenticationTicket = new AuthenticationTicket(
                            new ClaimsPrincipal(id),
                            data.AuthenticationTicket.Properties,
                            data.AuthenticationTicket.AuthenticationScheme);

                        return Task.FromResult(0);
                    },
                    OnRedirectToEndSessionEndpoint = data =>
                    {
                        var user = data.HttpContext.User;
                        var idToken = user.FindFirst("id_token");

                        if (idToken != null)
                        {
                            data.ProtocolMessage.IdTokenHint = idToken.Value;
                        }

                        return Task.FromResult(0);
                    }
                };
            });

            app.UseStaticFiles();

            app.UseDeveloperExceptionPage();
            app.UseMvcWithDefaultRoute();
            app.UseSignalR();
        }
    }
}
