using Autofac;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Providers;

namespace Pickle.Web.Registration
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<TokenUsernameProvider>().AsImplementedInterfaces();

            builder.RegisterGeneric(typeof(InMemoryGenericRepository<>)).As(typeof(IRepository<>));
        }
    }
}
