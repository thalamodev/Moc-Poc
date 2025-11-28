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
            return await _context.MoCRequests
                .Select(m => new MocRequestDto
                {
                    Id = m.Id,
                    MocNumber = m.MocNumber,
                    Title = m.Title,
                    Category = m.Category,
                    PlantChangeType = m.PlantChangeType,
                    Type = m.Type, // ChangeType in DB
                    Urgency = m.Urgency,
                    InitiatorDepartment = m.InitiatorDepartment,
                    InitiatorDivision = m.InitiatorDivision,
                    Location = m.Location,
                    ScopeJson = m.ScopeJson,
                    Detail = m.Detail,
                    ReasonForChange = m.ReasonForChange,
                    Benefits = m.Benefits,
                    AssetsAffected = m.AssetsAffected,
                    NotificationNumber = m.NotificationNumber,
                    RiskLevel = m.RiskLevel,
                    Status = m.Status,
                    RequesterId = m.RequesterId,
                    RequesterName = m.RequesterName,
                    CreatedDate = m.CreatedDate,
                    UpdatedDate = m.UpdatedDate
                })
                .ToListAsync();
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
                Category = m.Category,
                PlantChangeType = m.PlantChangeType,
                Type = m.Type,
                Urgency = m.Urgency,
                InitiatorDepartment = m.InitiatorDepartment,
                InitiatorDivision = m.InitiatorDivision,
                Location = m.Location,
                ScopeJson = m.ScopeJson,
                Detail = m.Detail,
                ReasonForChange = m.ReasonForChange,
                Benefits = m.Benefits,
                AssetsAffected = m.AssetsAffected,
                NotificationNumber = m.NotificationNumber,
                RiskLevel = m.RiskLevel,
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
                Category = createDto.Category,
                PlantChangeType = createDto.PlantChangeType,
                Type = createDto.Type,
                Urgency = createDto.Urgency,
                InitiatorDepartment = createDto.InitiatorDepartment,
                InitiatorDivision = createDto.InitiatorDivision,
                Location = createDto.Location,
                ScopeJson = createDto.Scope != null ? JsonSerializer.Serialize(createDto.Scope) : null,
                Detail = createDto.Detail,
                ReasonForChange = createDto.ReasonForChange,
                Benefits = createDto.Benefits,
                AssetsAffected = createDto.AssetsAffected,
                NotificationNumber = createDto.NotificationNumber,
                RiskLevel = createDto.RiskLevel,
                
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
                Category = mocRequest.Category,
                PlantChangeType = mocRequest.PlantChangeType,
                Type = mocRequest.Type,
                Urgency = mocRequest.Urgency,
                InitiatorDepartment = mocRequest.InitiatorDepartment,
                InitiatorDivision = mocRequest.InitiatorDivision,
                Location = mocRequest.Location,
                ScopeJson = mocRequest.ScopeJson,
                Detail = mocRequest.Detail,
                ReasonForChange = mocRequest.ReasonForChange,
                Benefits = mocRequest.Benefits,
                AssetsAffected = mocRequest.AssetsAffected,
                NotificationNumber = mocRequest.NotificationNumber,
                RiskLevel = mocRequest.RiskLevel,
                Status = mocRequest.Status,
                RequesterId = mocRequest.RequesterId,
                RequesterName = mocRequest.RequesterName,
                CreatedDate = mocRequest.CreatedDate,
                UpdatedDate = mocRequest.UpdatedDate
            });
        }
    }
}
