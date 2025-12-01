using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Thalamo.Gsp.Emoc.Services.Hubs;

namespace Thalamo.Gsp.Emoc.Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {
        private readonly IHubContext<AiHub> _hubContext;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public AiController(IHubContext<AiHub> hubContext, IConfiguration configuration)
        {
            _hubContext = hubContext;
            _configuration = configuration;
            _httpClient = new HttpClient();
        }

        public class AskRequest
        {
            public string Prompt { get; set; } = string.Empty;
            public string ConnectionId { get; set; } = string.Empty;
        }

        public class CallbackRequest
        {
            public string ConnectionId { get; set; } = string.Empty;
            public object Result { get; set; } // The JSON object from N8N
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskAi([FromBody] AskRequest request)
        {
            if (string.IsNullOrEmpty(request.Prompt) || string.IsNullOrEmpty(request.ConnectionId))
            {
                return BadRequest("Prompt and ConnectionId are required.");
            }

            var n8nWebhookUrl = _configuration["N8N_WEBHOOK_URL"];
            if (string.IsNullOrEmpty(n8nWebhookUrl))
            {
                return StatusCode(500, "N8N Webhook URL is not configured.");
            }

            // Fire and forget call to N8N (or await if we want to ensure it reached N8N)
            // We pass the ConnectionId to N8N so it can pass it back in the callback
            var n8nUrlWithParams = $"{n8nWebhookUrl}?chatInput={Uri.EscapeDataString(request.Prompt)}&connectionId={Uri.EscapeDataString(request.ConnectionId)}";

            try
            {
                // We don't wait for the full AI processing here, just that the request was sent.
                // N8N will call /api/ai/callback when done.
                // However, since N8N webhook node might wait for the chain, we can just trigger it.
                // Ideally, N8N should just accept the request and process async, OR we wait here.
                // Given the requirement for "Callback", we assume N8N will call us back.
                
                // NOTE: If N8N is synchronous, this call will wait. If we want async, we should just fire it.
                // For this implementation, we'll fire and forget to avoid blocking the API thread if N8N takes long.
                _ = _httpClient.GetAsync(n8nUrlWithParams); 
                
                return Ok(new { message = "Request sent to AI Agent." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error calling N8N: {ex.Message}");
            }
        }

        [HttpPost("callback")]
        public async Task<IActionResult> ReceiveCallback([FromBody] CallbackRequest request)
        {
            if (string.IsNullOrEmpty(request.ConnectionId) || request.Result == null)
            {
                return BadRequest("ConnectionId and Result are required.");
            }

            // Push the result to the specific client via SignalR
            await _hubContext.Clients.Client(request.ConnectionId).SendAsync("ReceiveAiResult", request.Result);

            return Ok(new { status = "success" });
        }
    }
}
