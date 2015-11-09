using Autofac;
using Pickle.Data.DataModels;
using Pickle.Data.EntityFramework.Context;
using Pickle.Data.EntityFramework.Repositories;
using Pickle.Data.Mapping;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Providers;

namespace Pickle.Web.Registration
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<TokenUsernameProvider>().AsImplementedInterfaces();
            builder.RegisterType<Mapper>().As<IMapper>();
            builder.RegisterType<PickleContext>().As<PickleContext>();
            builder.RegisterType<EntityFrameworkRepository<Hub, HubDataModel>>().As<IRepository<Hub>>();
            builder.RegisterType<EntityFrameworkRepository<Channel, ChannelDataModel>>().As<IRepository<Channel>>();
            builder.RegisterType<EntityFrameworkRepository<ChatMessage, ChatMessageDataModel>>().As<IRepository<ChatMessage>>();
        }
    }
}

