using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Thalamo.Gsp.Emoc.Services.Data;
using Thalamo.Gsp.Emoc.Services.Dto;
using Thalamo.Gsp.Emoc.Services.Models;

namespace Thalamo.Gsp.Emoc.Services.Controllers
{
    // [Authorize] // Commented out for easier testing as requested "stub code to verify connectivity"
    [Route("api/[controller]")]
    [ApiController]
    public class MocRequestsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MocRequestsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MocRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MocRequestDto>>> GetMocRequests()
        {
            // STUB: Return dummy data to avoid DB schema mismatch errors during redesign testing
            var dummyList = new List<MocRequestDto>
            {
                new MocRequestDto
                {
                    Id = 1,
                    MocNumber = "MOC-2024-TEST",
                    Title = "Test MoC 1",
                    Type = "Permanent",
                    ReasonForChange = "Testing redesign",
                    EstimatedBenefit = 100000,
                    EstimatedCost = 5000,
                    EstimatedStartDate = DateTime.UtcNow,
                    EstimatedEndDate = DateTime.UtcNow.AddDays(30),
                    Background = "Background info",
                    Objective = "Objective info",
                    Status = "Draft",
                    RequesterName = "John Smith",
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow
                }
            };
            return Ok(dummyList);
        }

        // GET: api/MocRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MocRequestDto>> GetMocRequest(int id)
        {
            var m = await _context.MoCRequests.FindAsync(id);

            if (m == null)
            {
                return NotFound();
            }

            return new MocRequestDto
            {
                Id = m.Id,
                MocNumber = m.MocNumber,
                Title = m.Title,
                Type = m.Type,
                ReasonForChange = m.ReasonForChange,
                EstimatedBenefit = m.EstimatedBenefit,
                EstimatedCost = m.EstimatedCost,
                EstimatedStartDate = m.EstimatedStartDate,
                EstimatedEndDate = m.EstimatedEndDate,
                Background = m.Background,
                Objective = m.Objective,
                Target = m.Target,
                Status = m.Status,
                RequesterId = m.RequesterId,
                RequesterName = m.RequesterName,
                CreatedDate = m.CreatedDate,
                UpdatedDate = m.UpdatedDate
            };
        }

        // POST: api/MocRequests
        [HttpPost]
        public async Task<ActionResult<MocRequestDto>> PostMocRequest(CreateMocRequestDto createDto)
        {
            // Stub user for now if not authenticated
            var userId = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value ?? "stub-user-id";
            var userName = User.Identity?.Name ?? "Stub User";

            var mocRequest = new MoCRequest
            {
                Title = createDto.Title,
                Type = createDto.Type,
                ReasonForChange = createDto.ReasonForChange,
                EstimatedBenefit = createDto.EstimatedBenefit,
                EstimatedCost = createDto.EstimatedCost,
                EstimatedStartDate = createDto.EstimatedStartDate,
                EstimatedEndDate = createDto.EstimatedEndDate,
                Background = createDto.Background,
                Objective = createDto.Objective,
                Target = createDto.Target,
                
                Status = "Draft",
                RequesterId = userId,
                RequesterName = userName,
                MocNumber = $"MOC-{DateTime.UtcNow.Year}-{Guid.NewGuid().ToString().Substring(0, 4).ToUpper()}",
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            // STUB: Do not save to DB yet, just return success to verify connectivity
            // _context.MoCRequests.Add(mocRequest);
            // await _context.SaveChangesAsync();
            mocRequest.Id = 123; // Fake ID

            return CreatedAtAction("GetMocRequest", new { id = mocRequest.Id }, new MocRequestDto
            {
                Id = mocRequest.Id,
                MocNumber = mocRequest.MocNumber,
                Title = mocRequest.Title,
                Type = mocRequest.Type,
                ReasonForChange = mocRequest.ReasonForChange,
                EstimatedBenefit = mocRequest.EstimatedBenefit,
                EstimatedCost = mocRequest.EstimatedCost,
                EstimatedStartDate = mocRequest.EstimatedStartDate,
                EstimatedEndDate = mocRequest.EstimatedEndDate,
                Background = mocRequest.Background,
                Objective = mocRequest.Objective,
                Target = mocRequest.Target,
                Status = mocRequest.Status,
                RequesterId = mocRequest.RequesterId,
                RequesterName = mocRequest.RequesterName,
                CreatedDate = mocRequest.CreatedDate,
                UpdatedDate = mocRequest.UpdatedDate
            });
        }
    }
}
