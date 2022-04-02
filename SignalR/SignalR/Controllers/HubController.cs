using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;

namespace SignalR.Controllers
{
    public class HubController : ControllerBase
    {
        private readonly IHubContext<CustomHub, IClientInterface> _hub;

        public HubController(IHubContext<CustomHub, IClientInterface> hub)
        {
            _hub = hub;
        }

        [HttpGet("/send")]
        public async Task<IActionResult> SendMessage()
        {
            await _hub.Clients.All.ClientHook(new(505, "505 with line!"));

            return Ok();
        }
    }
}
