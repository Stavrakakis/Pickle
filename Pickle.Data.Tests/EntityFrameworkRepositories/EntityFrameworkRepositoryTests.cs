using Microsoft.Data.Entity;
using Moq;
using Pickle.Data.DataModels;
using Pickle.Data.EntityFramework.Context;
using Pickle.Data.EntityFramework.Repositories;
using Pickle.Data.Mapping;
using Pickle.Data.Models;
using Pickle.Tests.Common.Attributes;
using Ploeh.AutoFixture;
using System.Linq;
using Xunit;

namespace Pickle.Data.Tests.EntityFrameworkRepositories
{
    public class EntityFrameworkRepositoryTests
    {
        [Theory]
        [AutoMoqData]
        public void TestThatOrderByFunctionIsUsed(
            Mock<DbSet<ChannelDataModel>> channelDbSet,
            Mock<IMapper> mapper,
            Mock<PickleContext> context)
        {
            //var optionsBuilder = new DbContextOptionsBuilder<PickleContext>();
            
            //AutoMapper.Mapper.CreateMap<Channel, ChannelDataModel>();
            //AutoMapper.Mapper.CreateMap<ChannelDataModel, Channel>();

            //var channelModels = new Fixture().CreateMany<ChannelDataModel>(50).AsQueryable();

            //channelDbSet.As<IQueryable<ChannelDataModel>>().Setup(m => m.Provider).Returns(channelModels.Provider);
            //channelDbSet.As<IQueryable<ChannelDataModel>>().Setup(m => m.Expression).Returns(channelModels.Expression);
            //channelDbSet.As<IQueryable<ChannelDataModel>>().Setup(m => m.ElementType).Returns(channelModels.ElementType);
            //channelDbSet.As<IQueryable<ChannelDataModel>>().Setup(m => m.GetEnumerator()).Returns(channelModels.GetEnumerator());

            //context.Setup(c => c.Channels).Returns(channelDbSet.Object);

            //var repository = new EntityFrameworkRepository<Channel, ChannelDataModel>(context.Object, mapper.Object);

            //var channels = repository.GetPaged(1, 10);
        }
    }
}
