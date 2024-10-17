namespace ApiProject.Models
{
    public class Cart
    {
        public int Id { get; set; }

        // Foreign key for User
        public int UserId { get; set; }

        // Navigation property to User
        public virtual User User { get; set; }

        // Collection of Products in this cart
        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    }
}
