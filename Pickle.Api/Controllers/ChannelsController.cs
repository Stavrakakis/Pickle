using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Pickle.Api.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Pickle.Api.Controllers
{
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
