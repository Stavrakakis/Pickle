using Microsoft.AspNet.Hosting;
using Moq;
using Pickle.Web.Api.Providers;
using Pickle.Web.Tests.Attributes;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Web.Tests.Providers
{
    public class TokenUsernameProviderTests
    {
        private readonly string usernameClaimType = "given_name";

        [Theory]
        [AutoMoqData]
        public async Task GetsTheUsernameFromTheClaimsWhenAuthenticated(
            Mock<IHttpContextAccessor> contextAccessor,
            Mock<Microsoft.AspNet.Http.HttpContext> context,
            Mock<ClaimsPrincipal> claimsPrincipal,
            string givenName)
        {
            claimsPrincipal.Setup(ci => ci.HasClaim(It.IsAny<Predicate<Claim>>())).Returns(true);
            claimsPrincipal.Setup(ci => ci.FindFirst(usernameClaimType)).Returns(new Claim(usernameClaimType, givenName));

            context.SetupProperty(c => c.User, claimsPrincipal.Object);
            contextAccessor.SetupProperty(ca => ca.HttpContext, context.Object);

            var providerUnderTest = new TokenUsernameProvider(contextAccessor.Object);

            var username = await providerUnderTest.GetUsername();

            Assert.Equal(givenName, username);
        }

        [Theory]
        [AutoMoqData]
        public async Task GettingUsernameWithoutCurrentUserThrowsInvalidOperationException(
            Mock<IHttpContextAccessor> contextAccessor,
            Mock<Microsoft.AspNet.Http.HttpContext> context)
        {
            context.SetupProperty(c => c.User, null);
            contextAccessor.SetupProperty(ca => ca.HttpContext, context.Object);

            var providerUnderTest = new TokenUsernameProvider(contextAccessor.Object);

            await Assert.ThrowsAsync<InvalidOperationException>(async () => { await providerUnderTest.GetUsername(); });
        }

        [Theory]
        [AutoMoqData]
        public async Task GetsTheUsernameFromTheClaimsWhenAuthenticatedButNoUsernameClaimThrowsException(
            Mock<IHttpContextAccessor> contextAccessor,
            Mock<Microsoft.AspNet.Http.HttpContext> context,
            Mock<ClaimsPrincipal> claimsPrincipal,
            string givenName)
        {
            context.SetupProperty(c => c.User, claimsPrincipal.Object);
            contextAccessor.SetupProperty(ca => ca.HttpContext, context.Object);

            var providerUnderTest = new TokenUsernameProvider(contextAccessor.Object);
            
            await Assert.ThrowsAsync<InvalidOperationException>(async () => { await providerUnderTest.GetUsername(); });
        }
    }
}
