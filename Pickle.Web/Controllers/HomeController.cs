using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace Pickle.Web.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public IActionResult Index()
        {
            var user = User.Identity;
            return View();
        }

        [Authorize]
        public IActionResult Secure()
        {
            var user = User.Identity;
            return View();
        }
    }
}
