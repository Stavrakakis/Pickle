using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Pickle.Data.Repositories;
using System;
using PagedList;
using Pickle.Data.DataModels;
using System.Linq;

namespace Pickle.Api.Controllers
{
    [Authorize]
    public class ChannelsController : Controller
    {
        private readonly IRepository<ChannelDataModel> channelRepository;

        public ChannelsController(IRepository<ChannelDataModel> channelRepository)
        {
            if (channelRepository == null)
            {
                throw new ArgumentNullException(nameof(channelRepository));
            }

            this.channelRepository = channelRepository;
        }

        [HttpGet]
        [Route("/api/channels")]
        public async Task<IPagedList<ChannelDataModel>> GetAllPagedHubs(int pageNumber = 1, int pageSize = 100)
        {
            var channels = await this.channelRepository.GetPaged(pageNumber, pageSize);

            return channels;
        }

        [HttpGet]
        [Route("/api/hub/{hubSlug}/channels")]
        public async Task<IPagedList<ChannelDataModel>> GetPagedChannelsForHub(string hubSlug, int pageNumber = 1, int pageSize = 100)
        {
            var channels = await this.channelRepository.GetPaged(pageNumber, pageSize, query => query.Where(channel => channel.HubId == hubSlug));
            
            return channels;
        }
    }
}
