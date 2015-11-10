using Moq;
using PagedList;
using Pickle.Api.Controllers;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Tests.Common.Attributes;
using System;
using System.Collections.Generic;
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
            Mock<IRepository<Channel>> channelRepository,
            IEnumerable<Channel> channels)
        {
            
            channelRepository.Setup(r => r.GetPaged(1, 100, null, null)).Returns(Task.FromResult(channels.ToPagedList(1, 100)));

            var controllerUnderTest = new ChannelsController(channelRepository.Object);

            var result = await controllerUnderTest.GetAllPagedHubs(1, 100);

            channelRepository.Verify(mock => mock.GetPaged(1, 100, null, null), Times.Once());
        }

        [Theory]
        [AutoMoqData]
        public async Task GetHubChannelsCallsRepositoryWithCorrectParameters(
            Mock<IRepository<Channel>> channelRepository,
            string hubSlug,
            IEnumerable<Channel> channels)
        {
            channelRepository
                .Setup(r => r.GetPaged(1, 100, It.IsAny<Expression<Func<Channel,bool>>>(), null))
                .Returns(Task.FromResult(channels.ToPagedList(1, 100)));

            var controllerUnderTest = new ChannelsController(channelRepository.Object);

            var result = await controllerUnderTest.GetPagedChannelsForHub(hubSlug, 1, 100);
            
            channelRepository.Verify(mock => mock.GetPaged(1, 100, It.IsAny<Expression<Func<Channel, bool>>>(), null), Times.Once());
        }
    }
}
