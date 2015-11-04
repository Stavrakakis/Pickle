using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Pickle.Api.ApiRequestModels;
using Microsoft.AspNet.Authorization;
using Pickle.Web.Api.Providers;

namespace Pickle.Api.Controllers
{
    [Authorize]
    public class MessagesController : Controller
    {
        private static Dictionary<string, IList<string>> messages = 
            new Dictionary<string, IList<string>>(){
                { "bristol", new List<string> {""} },
                { "edinburgh", new List<string> { ""} },
            };
        private IUsernameProvider usernameProvider;

        public MessagesController(IUsernameProvider usernameProvider)
        {
            this.usernameProvider = usernameProvider;
        }

        [HttpGet]
        [Authorize]
        [Route("/api/messages/{channelId}")]
        public Task<IActionResult> GetAll(string channelId)
        {
            var user = User;

            var channel = messages[channelId];

            if (channel == null)
            {
                return Task.FromResult<IActionResult>(new HttpNotFoundResult());
            }

            var channelMessages = messages[channelId];

            return Task.FromResult<IActionResult>(new ObjectResult(channelMessages));
        }

        [HttpPost]
        [Authorize]
        [Route("/api/messages/{channelId}")]
        public async Task<IActionResult> Post(string channelId, [FromBody] NewMessageModel message)
        {
            var username = await this.usernameProvider.GetUsername();

            if (!messages.ContainsKey(channelId))
            {
                return new HttpNotFoundResult();
            }

            if (messages[channelId] == null) {
                messages[channelId] = new List<string>();
            }

            messages[channelId].Add(message.Message);

            return new CreatedAtRouteResult("/api/messages/", message);
        }
    }
}
