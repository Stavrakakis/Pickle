using Moq;
using PagedList;
using Pickle.Api.Controllers;
using Pickle.Data.DataModels;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Tests.Common.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Web.Tests.Controllers
{
    public class ChannelControllerTests
    {
        [Theory]
        [AutoMoqData]
        public async Task GetAllChannelsCallsRepositoryWithCorrectParameters(
            Mock<IRepository<ChannelDataModel>> channelRepository,
            IEnumerable<ChannelDataModel> channels)
        {
            
            channelRepository.Setup(r => r.GetPaged(1, 100, null)).Returns(Task.FromResult(channels.ToPagedList(1, 100)));

            var controllerUnderTest = new ChannelsController(channelRepository.Object);

            var result = await controllerUnderTest.GetAllPagedHubs(1, 100);

            channelRepository.Verify(mock => mock.GetPaged(1, 100, null), Times.Once());
        }

        [Theory]
        [AutoMoqData]
        public async Task GetHubChannelsCallsRepositoryWithCorrectParameters(
            Mock<IRepository<ChannelDataModel>> channelRepository,
            string hubSlug,
            IEnumerable<ChannelDataModel> channels)
        {
            channelRepository
                .Setup(r => r.GetPaged(1, 100, It.IsAny<Func<IEnumerable<ChannelDataModel>, IEnumerable<ChannelDataModel>>>()))
                .Returns(Task.FromResult(channels.ToPagedList(1, 100)));

            var controllerUnderTest = new ChannelsController(channelRepository.Object);

            var result = await controllerUnderTest.GetPagedChannelsForHub(hubSlug, 1, 100);
            
            channelRepository.Verify(mock => mock.GetPaged(1, 100, It.IsAny<Func<IEnumerable<ChannelDataModel>, IEnumerable<ChannelDataModel>>>()), Times.Once());
        }
    }
}
