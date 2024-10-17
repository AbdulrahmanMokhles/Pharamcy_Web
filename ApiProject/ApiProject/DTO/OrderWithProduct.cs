using System;

namespace PharmacyAPI.DTO
{
    public class OrderWithProduct
    {
        public string UserName { get; set; }
        public double TotalBalance { get; set; }
        public DateTime OrderTime { get; set; }
        public bool OrderStatus { get; set; }
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public double ProductPrice { get; set; }
    }
}
