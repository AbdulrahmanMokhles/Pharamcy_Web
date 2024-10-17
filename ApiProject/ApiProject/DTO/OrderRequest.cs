namespace ApiProject.DTO
{
    public class OrderRequest
    {
        public bool OrderStatus { get; set; }
        public double TotalBalance { get; set; }
        public DateTime OrderTime { get; set; }
    }
}
