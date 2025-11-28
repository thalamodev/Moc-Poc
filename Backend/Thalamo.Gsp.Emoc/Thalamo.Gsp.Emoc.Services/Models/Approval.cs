using System;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Models
{
    public class Approval
    {
        public int Id { get; set; }

        public int MocRequestId { get; set; }
        public MoCRequest? MocRequest { get; set; }

        [Required]
        [MaxLength(100)]
        public string StepName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? ApproverId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ApproverRole { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Pending";

        public string? Comments { get; set; }

        public DateTime? ActionDate { get; set; }

        [MaxLength(100)]
        public string? ActionByUserId { get; set; }
    }
}
