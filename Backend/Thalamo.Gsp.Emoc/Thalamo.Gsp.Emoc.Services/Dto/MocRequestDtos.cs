using System;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Dto
{
    public class MocRequestDto
    {
        public int Id { get; set; }
        public string MocNumber { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string? ReasonForChange { get; set; }
        public decimal? EstimatedBenefit { get; set; }
        public decimal? EstimatedCost { get; set; }
        public DateTime? EstimatedStartDate { get; set; }
        public DateTime? EstimatedEndDate { get; set; }
        public string? Background { get; set; }
        public string? Objective { get; set; }
        public string? Target { get; set; }
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

        [Required]
        public string Type { get; set; } = string.Empty; // Permanent, Temporary, Overriding

        [Required]
        public string ReasonForChange { get; set; } = string.Empty;

        [Required]
        public decimal EstimatedBenefit { get; set; }

        [Required]
        public decimal EstimatedCost { get; set; }

        [Required]
        public DateTime EstimatedStartDate { get; set; }

        [Required]
        public DateTime EstimatedEndDate { get; set; }

        [Required]
        public string Background { get; set; } = string.Empty;

        [Required]
        public string Objective { get; set; } = string.Empty;

        public string? Target { get; set; }
    }

    public class UpdateMocRequestDto : CreateMocRequestDto
    {
        // Inherits all fields from Create
    }
}
