using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using PagedList;
using Pickle.Api.ApiRequestModels;
using Pickle.Data.DataModels;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Filters;
using Pickle.Web.Api.Providers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Pickle.Api.Controllers
{
    [Authorize]
    [ValidateModelState]
    public class MessagesController : Controller
    {
        private readonly IRepository<ChatMessageDataModel> messageRepository;
        private IUsernameProvider usernameProvider;

        public MessagesController(IUsernameProvider usernameProvider, IRepository<ChatMessageDataModel> messageRepository)
        {
            this.messageRepository = messageRepository;
            this.usernameProvider = usernameProvider;
        }

        [HttpGet]
        [Authorize]
        [Route("/api/hub/{hubSlug}/{channelId}/messages/")]
        public async Task<IPagedList<ChatMessageDataModel>> GetPagedMessagesForChannel(string hubSlug, string channelId, int pageNumber = 1, int pageSize = 100)
        {
            return await this.messageRepository.GetPaged(
                pageNumber,
                pageSize,
                list => list.Where(channel => channel.ChannelId == channelId)
                            .OrderBy(message => message.CreatedDate));
        }

        [HttpPost]
        [Authorize]
        [Route("/api/hub/{hubSlug}/{channelId}/messages")]
        public async Task<IActionResult> PostNewMessage(string hubSlug, string channelId, [FromBody] NewMessageModel messageContent)
        {
            var username = await this.usernameProvider.GetUsername();

            var message = new ChatMessage(username, channelId, messageContent.Message, DateTime.Now);

            var dto = AutoMapper.Mapper.Map<ChatMessage, ChatMessageDataModel>(message);

            dto = await this.messageRepository.Insert(dto);
            
            return new CreatedAtRouteResult(string.Format("/api/{0}/{1}/messages/", hubSlug, channelId), dto);
        }
    }
}
