using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using PagedList;
using Pickle.Api.ApiRequestModels;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Filters;
using Pickle.Web.Api.Providers;
using System.Threading.Tasks;

namespace Pickle.Api.Controllers
{
    [Authorize]
    [ValidateModelState]
    public class MessagesController : Controller
    {
        private readonly IRepository<ChatMessage> messageRepository;
        private IUsernameProvider usernameProvider;

        public MessagesController(IUsernameProvider usernameProvider, IRepository<ChatMessage> messageRepository)
        {
            this.messageRepository = messageRepository;
            this.usernameProvider = usernameProvider;
        }

        [HttpGet]
        [Authorize]
        [Route("/api/hub/{hubSlug}/{channelId}/messages/")]
        public async Task<IPagedList<ChatMessage>> GetPagedMessagesForChannel(string hubSlug, string channelId, int pageNumber = 1, int pageSize = 100)
        {
            return await this.messageRepository.GetPaged(pageNumber, pageSize, m => m.ChannelId == channelId);
        }

        [HttpPost]
        [Authorize]
        [Route("/api/hub/{hubSlug}/{channelId}/messages")]
        public async Task<IActionResult> PostNewMessage(string hubSlug, string channelId, [FromBody] NewMessageModel messageContent)
        {
            var username = await this.usernameProvider.GetUsername();

            var message = new ChatMessage(username, channelId, messageContent.Message);

            message = await this.messageRepository.Insert(message);

            return new CreatedAtRouteResult(string.Format("/api/{0}/{1}/messages/", hubSlug, channelId), message);
        }
    }
}
