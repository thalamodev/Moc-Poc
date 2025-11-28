using System;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Models
{
    public class AuditLog
    {
        public int Id { get; set; }

        public int MocRequestId { get; set; }
        public MoCRequest? MocRequest { get; set; }

        [Required]
        [MaxLength(100)]
        public string Action { get; set; } = string.Empty;

        public string? Details { get; set; }

        [Required]
        [MaxLength(100)]
        public string PerformedBy { get; set; } = string.Empty;

        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
