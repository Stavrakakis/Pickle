using Autofac;
using Pickle.Web.Api.Providers;

namespace Pickle.Web.Registration
{
    public class AutofacModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<TokenUsernameProvider>().AsImplementedInterfaces();
        }
    }
}
