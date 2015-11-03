using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace Pickle.Web.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            return View();
        }
    }
}
