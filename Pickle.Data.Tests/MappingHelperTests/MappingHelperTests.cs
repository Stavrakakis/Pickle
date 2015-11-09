using Pickle.Data.DataModels;
using Pickle.Data.Mapping;
using Pickle.Data.Models;
using System;
using System.Linq.Expressions;
using Xunit;

namespace Pickle.Data.Tests.Mapping
{
    public class MappingHelperTests
    {
        [Fact]
        public void MappingHelperMapsDomainExprToDto()
        {

            AutoMapper.Mapper.CreateMap<Channel, ChannelDataModel>();
            AutoMapper.Mapper.CreateMap<ChannelDataModel, Channel>();

            Expression<Func<Channel, bool>> expression = c => c.HubId == "hub";

            var mapped = MappingHelper.ConvertExpression<Channel, ChannelDataModel>(expression);

            Assert.IsType<Expression<Func<ChannelDataModel, bool>>>(mapped);
        }
    }
}
