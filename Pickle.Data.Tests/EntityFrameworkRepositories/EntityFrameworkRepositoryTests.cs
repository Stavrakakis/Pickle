

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
using System.Threading.Tasks;
using Xunit;

namespace Pickle.Data.Tests.EntityFrameworkRepositories
{
    public class EntityFrameworkRepositoryTests
    {
        [Theory]
        [AutoMoqData]
        public async Task TestThatOrderByFunctionIsUsed(
            Mock<DbSet<ChannelDataModel>> channelDbSet,
            Mock<IMapper> mapper)
        {
            AutoMapper.Mapper.CreateMap<ChannelDataModel, Channel>();
            AutoMapper.Mapper.CreateMap<Channel, ChannelDataModel>();

            var context = TestContextExtensions.CreateTestContext();

            var reverseOrderedChannels = new Fixture().CreateMany<ChannelDataModel>(100).OrderBy(c => c.CreatedDate);
            
            context.Channels.AddRange(reverseOrderedChannels);

            context.SaveChanges();
            
            var repositoryUnderTest = new EntityFrameworkRepository<ChannelDataModel>(context, mapper.Object);

            var channels = await repositoryUnderTest.GetPaged(1, 100, query => query.OrderByDescending(c => c.CreatedDate));

            Assert.True(channels.SequenceEqual(reverseOrderedChannels.OrderByDescending(c => c.CreatedDate)));
        }

        [Theory]
        [AutoMoqData]
        public void TestThatFilterQueryWorks(
            Mock<DbSet<ChannelDataModel>> channelDbSet,
            Mock<IMapper> mapper)
        {
            
        }

    }

    public static class TestContextExtensions
    {
        public static PickleContext CreateTestContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<PickleContext>();
            optionsBuilder.UseInMemoryDatabase();
            return new PickleContext(optionsBuilder.Options);
        }

        public static PickleContext WithMany<TData>(this PickleContext context, int num) where TData : class
        {
            var items = new Fixture().CreateMany<TData>(num);

            context.Set<TData>().AddRange(items);

            context.SaveChanges();

            return context;
        }
    }
}
