using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Pickle.Api.Models;
using Microsoft.AspNet.Authorization;

namespace Pickle.Api.Controllers
{
    [Authorize]
    public class ChannelsController : Controller
    {
        [HttpGet]
        [Route("/api/channels")]
        public Task<IActionResult> Index()
        {
            var channels = new List<Channel> { new Channel("bristol", "Bristol"), new Channel("edinburgh", "Edinburgh") };

            return Task.FromResult<IActionResult>(new ObjectResult(channels));
        }
    }
}
