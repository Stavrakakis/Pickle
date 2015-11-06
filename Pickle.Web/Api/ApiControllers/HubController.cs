using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using Pickle.Data.Repositories;
using System;
using Pickle.Data.Models;

namespace Pickle.Api.Controllers
{
    [Authorize]
    public class HubController : Controller
    {
        private readonly IRepository<Hub> hubRepository;

        public HubController(IRepository<Hub> hubRepository)
        {
            if (hubRepository == null)
            {
                throw new ArgumentNullException(nameof(hubRepository));
            }

            this.hubRepository = hubRepository;
        }
        [HttpGet]
        [Route("/api/hubs")]
        public async Task<IActionResult> GetPagedHubs(string hubSlug, int pageNumber = 1, int pageSize = 100)
        {
            var hubs = await this.hubRepository.GetPaged(pageNumber, pageSize);

            return new ObjectResult(hubs);
        }


        [HttpGet]
        [Route("/api/hub/{hubSlug}")]
        public Task<IActionResult> GetPagedChannelsForHub(string hubSlug, int pageNumber = 1, int pageSize = 100)
        {
            throw new NotImplementedException();
        }
    }
}
