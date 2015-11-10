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
        public async Task<IPagedList<Hub>> GetPagedHubs(int pageNumber = 1, int pageSize = 100)
        {
            return await this.hubRepository.GetPaged(pageNumber, pageSize);            
        }
    }
}
