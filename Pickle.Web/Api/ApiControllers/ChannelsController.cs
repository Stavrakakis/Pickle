using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Pickle.Data.Repositories;
using System;
using Pickle.Data.Models;
using PagedList;

namespace Pickle.Api.Controllers
{
    [Authorize]
    public class ChannelsController : Controller
    {
        private readonly IRepository<Channel> channelRepository;

        public ChannelsController(IRepository<Channel> channelRepository)
        {
            if (channelRepository == null)
            {
                throw new ArgumentNullException(nameof(channelRepository));
            }

            this.channelRepository = channelRepository;
        }

        [HttpGet]
        [Route("/api/channels")]
        public async Task<IPagedList<Channel>> GetAllPagedHubs(int pageNumber = 1, int pageSize = 100)
        {
            var channels = await this.channelRepository.GetPaged(pageNumber, pageSize);

            return channels;
        }

        [HttpGet]
        [Route("/api/hub/{hubSlug}/channels")]
        public async Task<IPagedList<Channel>> GetPagedChannelsForHub(string hubSlug, int pageNumber = 1, int pageSize = 100)
        {
            var channels = await this.channelRepository.GetPaged(pageNumber, pageSize, channel => channel.HubId == hubSlug);
            
            return channels;
        }
    }
}
