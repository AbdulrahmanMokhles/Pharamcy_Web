using ApiProject.DTO;
using ApiProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyAPI.DTO;
using PharmacyAPI.Models;
using System;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly pharmDbcontext _context;

        public OrderController(pharmDbcontext context)
        {
            _context = context;
        }
        //get all orders
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            List<Order> orders = _context.Orders.Include(o=> o.User).ToList();
            //foreach (var item in orders)
            //{
            //    Cart cart = _context.Carts.Include(u => u.User).Include(p => p.CartItems).FirstOrDefault(c => c.Id == item.UserID);
            //}

            if (orders == null)
                return NotFound();
            else
                return Ok(orders);
        }

        //get one order
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Details(int id)
        //{
        //    Order order = _context.Orders.Include(u => u.User).FirstOrDefault(o => o.ID == id);
        //    User user = _context.Users.Include(c => c.Cart).FirstOrDefault(u => u.Id == order.UserID);
        //    // Cart cart = _context.Carts.Include(u => u.User).Include(p => p.CartItems).FirstOrDefault(c => c.Id == user.Cart.Id);
        //    //CartWithUser cartWithUser = new CartWithUser();
        //    //cartWithUser.CartID = cart.ID;
        //    //cartWithUser.UserName = cart.User.UserName;
        //    if (order == null)
        //        return NotFound();
        //    {
        //        OrderWithProduct orderWithProduct = new OrderWithProduct();
        //        orderWithProduct.UserName = user.Name;
        //        orderWithProduct.TotalBalance = order.TotalBalance;
        //        orderWithProduct.OrderTime = order.OrderTime;
        //        orderWithProduct.OrderStatus = order.OrderStatus;
        //        foreach (var item in user.Cart.CartItems)
        //        {
        //            orderWithProduct.ProductName = item.Product.Name;
        //            orderWithProduct.ProductPrice = item.Product.Price;
        //            orderWithProduct.ProductQuantity = item.Quantity;
        //        }
        //        //orderWithProduct.ProductName = order.Cart.CartItems.FirstOrDefault().Product.Name;
        //        //orderWithProduct.ProductPrice = order.Cart.Product.Price;
        //        //orderWithProduct.ProductQuantity = order.Cart.Product.quantity;
        //        return Ok(orderWithProduct);
        //    }
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            Order order = _context.Orders.Include(u => u.User).FirstOrDefault(o => o.ID == id);
            User user = _context.Users.Include(c => c.Cart).FirstOrDefault(u => u.Id == order.User.Id);
            // Cart cart = _context.Carts.Include(u => u.User).Include(p => p.CartItems).FirstOrDefault(c => c.Id == user.Cart.Id);
            //CartWithUser cartWithUser = new CartWithUser();
            //cartWithUser.CartID = cart.ID;
            //cartWithUser.UserName = cart.User.UserName;
            if (order == null)
                return NotFound();
            else
            {
                OrderWithProduct orderWithProduct = new OrderWithProduct();
                orderWithProduct.UserName = user.Name;
                orderWithProduct.TotalBalance = order.TotalBalance;
                orderWithProduct.OrderTime = order.OrderTime;
                orderWithProduct.OrderStatus = order.OrderStatus;
                foreach (var item in user.Cart.CartItems)
                {
                    orderWithProduct.ProductName = item.Product.Name;
                    orderWithProduct.ProductPrice = item.Product.Price;
                    orderWithProduct.ProductQuantity = item.Quantity;
                }
                //orderWithProduct.ProductName = order.Cart.CartItems.FirstOrDefault().Product.Name;
                //orderWithProduct.ProductPrice = order.Cart.Product.Price;
                //orderWithProduct.ProductQuantity = order.Cart.Product.quantity;
                return Ok(orderWithProduct);
            }
        }


        //[HttpPut]
        //public async Task<IActionResult> Update(int id)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        Order oldOrder = _context.Orders.Find(id);
        //        if (oldOrder != null && oldOrder.OrderStatus == false)
        //        {
        //            _ = oldOrder.OrderStatus == true;
        //            _context.SaveChanges();
        //            return StatusCode(204, "Updated");
        //        }
        //        else
        //            return NotFound();
        //    }
        //    else
        //        return BadRequest(ModelState);
        //}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] OrderWithUser request)
        {
            var existingOrder = _context.Orders.Find(id);
            if (existingOrder == null)
            {
                return NotFound("Order not found");
            }
            if (request == null || request.order == null || request.UserId == 0)
            {
                return BadRequest();
            }
            var user = _context.Users.Find(request.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            existingOrder.OrderStatus = request.order.OrderStatus;
            existingOrder.User = user;
            _context.SaveChanges();
            return Ok(existingOrder);
        }

        [HttpPost]
        public async Task<IActionResult> placeOrder([FromBody] OrderWithUser request)
        {
            //if (ModelState.IsValid)
            //{
            //    _context.Orders.Add(order);
            //    _context.SaveChanges();
            //    return Ok("added");
            //}
            //return BadRequest(ModelState);
            if (request == null || request.order == null || request.UserId == 0)
            {
                return BadRequest();
            }
            var user = _context.Users.FirstOrDefault(u => u.Id == request.UserId);
            if (user == null)
            {
                return NotFound();
            }
            var order = new Order
            {
                OrderStatus = false,
                TotalBalance = request.order.TotalBalance,
                OrderTime = DateTime.UtcNow,
                User = user
            };
            _context.Orders.Add(order);
            _context.SaveChanges();
            return Ok("added");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Order order = _context.Orders.Find(id);
            if (order == null)
                return NotFound();
            else
            {
                _context.Orders.Remove(order);
                _context.SaveChanges();
                return NoContent();
            }
        }
    }
}
