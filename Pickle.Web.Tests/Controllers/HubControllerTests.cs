using Moq;
using PagedList;
using Pickle.Api.Controllers;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Tests.Common.Attributes;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Web.Tests.Controllers
{
    public class HubControllerTests
    {
        [Theory]
        [AutoMoqData]        
        public async Task GetHubsCallsRepositoryWithCorrectParameters(
            Mock<IRepository<Hub>> hubRepository,
            string hubSlug)
        {
            var controllerUnderTest = new HubController(hubRepository.Object);

            var result = await controllerUnderTest.GetPagedHubs(1, 100);

            hubRepository.Verify(mock => mock.GetPaged(1, 100, null), Times.Once);
        }

        [Theory]
        [AutoMoqData]
        public async Task GetHubsCallReturnsAnObjectResult(
            Mock<IRepository<Hub>> hubRepository,
            IPagedList<Hub> hubs,
            string hubSlug)
        {
            hubRepository.Setup(mock => mock.GetPaged(1, 100, null)).ReturnsAsync(hubs);

            var controllerUnderTest = new HubController(hubRepository.Object);

            var result = await controllerUnderTest.GetPagedHubs(1, 100);

            Assert.IsAssignableFrom<IPagedList<Hub>>(result);
        }
    }
}
