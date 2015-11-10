using Moq;
using PagedList;
using Pickle.Api.Controllers;
using Pickle.Data.DataModels;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Tests.Common.Attributes;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Web.Tests.Controllers
{
    public class HubControllerTests
    {
        [Theory]
        [AutoMoqData]        
        public async Task GetHubsCallsRepositoryWithCorrectParameters(
            Mock<IRepository<HubDataModel>> hubRepository,
            string hubSlug,
            IEnumerable<HubDataModel> hubs)
        {

            hubRepository.Setup(r => r.GetPaged(1, 100, null)).Returns(Task.FromResult(hubs.ToPagedList(1, 100)));
            
            var controllerUnderTest = new HubController(hubRepository.Object);

            var result = await controllerUnderTest.GetPagedHubs(1, 100);

            hubRepository.Verify(mock => mock.GetPaged(1, 100, null), Times.Once());
        }

        [Theory]
        [AutoMoqData]
        public async Task GetHubsCallReturnsAnObjectResult(
            Mock<IRepository<HubDataModel>> hubRepository,
            IPagedList<HubDataModel> hubs,
            string hubSlug)
        {
            hubRepository.Setup(mock => mock.GetPaged(1, 100, null)).Returns(Task.FromResult(hubs));

            var controllerUnderTest = new HubController(hubRepository.Object);

            var result = await controllerUnderTest.GetPagedHubs(1, 100);

            Assert.IsAssignableFrom<IPagedList<HubDataModel>>(result);
        }
    }
}
