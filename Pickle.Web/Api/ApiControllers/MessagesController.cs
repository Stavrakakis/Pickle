using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;
using Pickle.Api.ApiRequestModels;
using Pickle.Data.Models;
using Pickle.Data.Repositories;
using Pickle.Web.Api.Providers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pickle.Api.Controllers
{
    [Authorize]
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
        [Route("/api/messages/{channelId}")]
        public async Task<IActionResult> GetAll(string channelId)
        {
            var user = User;

            var messages = await this.messageRepository.GetPaged(1, 100, m => m.ChannelId == channelId);

            return new ObjectResult(messages);
        }

        [HttpPost]
        [Authorize]
        [Route("/api/messages/{channelId}")]
        public async Task<IActionResult> Post(string channelId, [FromBody] NewMessageModel messageContent)
        {
            var username = await this.usernameProvider.GetUsername();

            var message = new ChatMessage(username, channelId, messageContent.Message);

            message = await this.messageRepository.Insert(message);

            return new CreatedAtRouteResult("/api/messages/", message);
        }
    }
}
