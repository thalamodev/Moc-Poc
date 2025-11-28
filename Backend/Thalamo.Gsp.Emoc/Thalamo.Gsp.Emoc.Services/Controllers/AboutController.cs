using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Thalamo.Gsp.Emoc.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        [HttpGet("version")]
        public string Version()
        {
            return "1.0.3";
        }
    }
}
