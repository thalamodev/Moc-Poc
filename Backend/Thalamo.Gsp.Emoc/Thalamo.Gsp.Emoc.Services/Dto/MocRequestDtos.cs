using System;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Dto
{
    public class MocRequestDto
    {
        public int Id { get; set; }
        public string MocNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? PlantChangeType { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Urgency { get; set; } = string.Empty;
        public string? InitiatorDepartment { get; set; }
        public string? InitiatorDivision { get; set; }
        public string? Location { get; set; }
        public string? ScopeJson { get; set; }
        public string? Detail { get; set; }
        public string? ReasonForChange { get; set; }
        public string? Benefits { get; set; }
        public string? AssetsAffected { get; set; }
        public string? NotificationNumber { get; set; }
        public string RiskLevel { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string RequesterId { get; set; } = string.Empty;
        public string RequesterName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class CreateMocRequestDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;
        public string? PlantChangeType { get; set; }
        public string Type { get; set; } = string.Empty; // Permanent/Temporary
        public string Urgency { get; set; } = "Normal";
        public string? InitiatorDepartment { get; set; }
        public string? InitiatorDivision { get; set; }
        public string? Location { get; set; }
        public object? Scope { get; set; } // Accept object, controller will serialize to JSON
        public string? Detail { get; set; }
        public string? ReasonForChange { get; set; }
        public string? Benefits { get; set; }
        public string? AssetsAffected { get; set; }
        public string? NotificationNumber { get; set; }

        [Required]
        [MaxLength(50)]
        public string RiskLevel { get; set; } = string.Empty;
    }

    public class UpdateMocRequestDto : CreateMocRequestDto
    {
        // Inherits all fields from Create
    }
}
