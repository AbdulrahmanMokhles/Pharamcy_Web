using System.ComponentModel.DataAnnotations;

namespace ApiProject.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }

        public string? Image { get; set; } = null;
    }
}
