using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Models
{
    public class MoCRequest
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string MocNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // Permanent, Temporary, Overriding

        public string? ReasonForChange { get; set; }

        public decimal? EstimatedBenefit { get; set; }
        
        public decimal? EstimatedCost { get; set; }

        public DateTime? EstimatedStartDate { get; set; }

        public DateTime? EstimatedEndDate { get; set; }

        public string? Background { get; set; }

        public string? Objective { get; set; }

        public string? Target { get; set; }

        // System Fields
        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Draft";

        [Required]
        [MaxLength(100)]
        public string RequesterId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string RequesterName { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public ICollection<Approval> Approvals { get; set; } = new List<Approval>();
        public ICollection<Attachment> Attachments { get; set; } = new List<Attachment>();
        public ICollection<AuditLog> AuditLogs { get; set; } = new List<AuditLog>();
    }
}
