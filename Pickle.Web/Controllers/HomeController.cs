using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace Pickle.Web.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
