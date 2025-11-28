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

        // Form Fields
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty; // Plant Change, Maintenance Change, etc.

        [MaxLength(200)]
        public string? PlantChangeType { get; set; } // Standard - multiple, etc.

        [MaxLength(50)]
        public string Type { get; set; } = string.Empty; // Permanent, Temporary (Renamed from ChangeType to match form, or keep ChangeType) -> Let's use Type to match form but map to ChangeType if needed. Let's stick to "ChangeType" in DB to avoid confusion with C# Type, but form calls it "Type". I'll use "ChangeType" in DB.

        [MaxLength(50)]
        public string Urgency { get; set; } = "Normal";

        [MaxLength(100)]
        public string? InitiatorDepartment { get; set; }

        [MaxLength(100)]
        public string? InitiatorDivision { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; } // Was PlantArea

        public string? ScopeJson { get; set; } // JSON string for { mechanical: true, ... }

        public string? Detail { get; set; } // Was Description

        public string? ReasonForChange { get; set; }

        public string? Benefits { get; set; }

        public string? AssetsAffected { get; set; }

        [MaxLength(50)]
        public string? NotificationNumber { get; set; }

        [Required]
        [MaxLength(50)]
        public string RiskLevel { get; set; } = string.Empty;

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
