using System;
using System.ComponentModel.DataAnnotations;

namespace Thalamo.Gsp.Emoc.Services.Models
{
    public class Attachment
    {
        public int Id { get; set; }

        public int MocRequestId { get; set; }
        public MoCRequest? MocRequest { get; set; }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        [Required]
        [MaxLength(100)]
        public string UploadedBy { get; set; } = string.Empty;

        public DateTime UploadedDate { get; set; } = DateTime.UtcNow;

        public byte[]? FileData { get; set; }
    }
}
