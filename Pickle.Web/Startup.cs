using Autofac;
using Microsoft.AspNet.Authentication;
using Microsoft.AspNet.Authentication.OpenIdConnect;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Mvc;
using Microsoft.Framework.Runtime;
using Newtonsoft.Json.Serialization;
using Pickle.Web.Registration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Framework.DependencyInjection;
using Autofac.Framework.DependencyInjection;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Seed;
using Pickle.Data.EntityFramework.Context;
using Microsoft.Data.Entity;
using AutoMapper;
using Pickle.Data.DataModels;

namespace Pickle.Web
{
    public class Startup
    {
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                  .Configure<MvcOptions>(options => {

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

        public void Configure(IApplicationBuilder app, IApplicationEnvironment env, IServiceProvider serviceProvider)
        {
            Mapper.Initialize(cfg => {

                cfg.CreateMap<Hub, HubDataModel>();
                cfg.CreateMap<HubDataModel, Hub>();

                cfg.CreateMap<Channel, ChannelDataModel>();
                cfg.CreateMap<ChannelDataModel, Channel>();

                cfg.CreateMap<ChatMessage, ChatMessageDataModel>();
                cfg.CreateMap<ChatMessageDataModel, ChatMessage>();
            });

            Mapper.AssertConfigurationIsValid();

            var hubRepository = serviceProvider.GetService<IRepository<Hub>>();
            var channelRepository = serviceProvider.GetService<IRepository<Channel>>();
            var messageRepository = serviceProvider.GetService<IRepository<ChatMessage>>();
            
            //EntityFrameworkSeeder.Seed(hubRepository, channelRepository, messageRepository).Wait();

            // really? still?
            JwtSecurityTokenHandler.InboundClaimTypeMap = new Dictionary<string, string>();

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
                options.Scope = "openid email profile";
                options.RedirectUri = "https://localhost:44303/";
                options.SignInScheme = "Cookies";
                options.AutomaticAuthentication = true;
                options.Notifications = new OpenIdConnectAuthenticationNotifications
                {
                    SecurityTokenValidated = n =>
                    {
                        var incoming = n.AuthenticationTicket.Principal;

                        // create application identity
                        var id = new ClaimsIdentity("application", "given_name", "role");
                        id.AddClaim(incoming.FindFirst("sub"));
                        id.AddClaim(incoming.FindFirst("email"));
                        id.AddClaim(incoming.FindFirst("given_name"));
                        id.AddClaim(incoming.FindFirst("family_name"));
                        id.AddClaim(new Claim("token", n.ProtocolMessage.AccessToken));

                        n.AuthenticationTicket = new AuthenticationTicket(
                            new ClaimsPrincipal(id),
                            n.AuthenticationTicket.Properties,
                            n.AuthenticationTicket.AuthenticationScheme);

                        // this skips nonce checking & cleanup 
                        // see https://github.com/aspnet/Security/issues/372
                        n.HandleResponse();

                        return Task.FromResult(0);
                    }
                };
            });

            app.UseMvcWithDefaultRoute();
            app.UseSignalR();
        }
    }
}
