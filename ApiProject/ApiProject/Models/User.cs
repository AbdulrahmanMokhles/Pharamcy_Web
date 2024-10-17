namespace ApiProject.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } 

        public string Email { get; set; } 

        public string Password { get; set; } 

        public string Phone { get; set; }
        public string? Address { get; set; } = null!;

        // User can have only one cart
        public virtual Cart? Cart { get; set; }
    }
}
