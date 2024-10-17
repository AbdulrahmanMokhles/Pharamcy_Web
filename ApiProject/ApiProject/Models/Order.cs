using ApiProject.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyAPI.Models
{
    public class Order
    {
        public int ID { get; set; }
        public bool OrderStatus { get; set; }
        public double TotalBalance { get; set; }
        public DateTime OrderTime { get; set; }
        //[ForeignKey("User")]
        //public int UserID { get; set; }
        
        public User User { get; set; }
        //public Cart Cart { get; set; }
    }
}
