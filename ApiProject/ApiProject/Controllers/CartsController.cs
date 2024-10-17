//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using ApiProject.Models;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using ApiProject.Models;


//namespace ApiProject.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CartsController : ControllerBase
//    {
//        private readonly pharmDbcontext _context;
//        int _id = 2;
//        public CartsController(pharmDbcontext context)
//        {
//            _context = context;
//        }
//        [HttpGet("productid,userID")]
//        public IActionResult AddToCart(int productId, int userID)
//        {
//            // Retrieve the user from the database
//            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
//                                      .SingleOrDefault(u => u.Id == userID);

//            if (user == null)
//            {
//                return NotFound("User not found.");
//            }

//            // If the user doesn't have a cart, create a new one
//            var cart = user.Cart ?? CreateUserCart(user);

//            // Retrieve the product from the database
//            var product = _context.Products.SingleOrDefault(p => p.Id == productId);

//            if (product == null)
//            {
//                return NotFound("Product not found.");
//            }

//            // Check if the product already exists in the cart
//            var cartItem = cart.CartItems.FirstOrDefault(c => c.ProductId == productId);
//            //Console.WriteLine((++_id).ToString());
//            if (cartItem == null)
//            {
//                _id = 5;
//                // Create a new cart item if it doesn't exist
//                cartItem = new CartItem
//                {

//                    //ItemId = (_id).ToString(),

//                    ProductId = productId,
//                    CartId = user.Cart.Id,
//                    Quantity = 1,
//                    //DateCreated = DateTime.Now (if DateCreated is required)
//                };


//                cart.CartItems.Add(cartItem);
//                _context.ShoppingCartItems.Add(cartItem);
//                _context.Entry(cartItem).State = EntityState.Added;
//                //_context.SaveChanges(); // Commit the changes

//            }
//            else
//            {
//                // If the item exists in the cart, increment the quantity
//                cartItem.Quantity++;
//                _context.Entry(cartItem).State = EntityState.Modified;
//            }

//            // Save changes to the database
//            _context.SaveChanges();

//            return Ok(cartItem);
//        }

//        private Cart CreateUserCart(User user)
//        {
//            var cart = new Cart();
//            user.Cart = cart;
//            _context.SaveChanges(); // Save changes to create the cart
//            return cart;
//        }
//        [HttpGet("{userId}/products")]
//        public IActionResult GetCartProducts(int userId)
//        {
//            // Retrieve the user from the database
//            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
//                                      .SingleOrDefault(u => u.Id == userId);

//            if (user == null)
//            {
//                return NotFound("User not found.");
//            }

//            // Get the cart items for the user's cart
//            if (user.Cart.CartItems != null)
//            {

//                var cartItems = user.Cart.CartItems;

//                // Create a list to hold cart item details
//                var cartItemDetails = new List<object>();

//                // Iterate through each cart item and retrieve details
//                foreach (var cartItem in cartItems)
//                {
//                    // Retrieve product details for the current cart item
//                    var product = _context.Products
//                                            .Where(p => p.Id == cartItem.ProductId)
//                                            .Select(p => new
//                                            {
//                                                p.Id,
//                                                p.Name,
//                                                p.Description,
//                                                p.Price,
//                                                p.Image,
//                                                CartItemId = cartItem.ItemId, // Add CartItemId to identify cart item
//                                                cartItem.Quantity // Add Quantity from the cart item
//                                            })
//                                            .FirstOrDefault();

//                    if (product != null)
//                    {
//                        // Add cart item details to the list
//                        cartItemDetails.Add(product);
//                    }
//                }

//                return Ok(cartItemDetails);
//            }
//            return BadRequest();
//        }


//        [HttpDelete("{userId}/products/{productId}")]
//        public IActionResult RemoveProductFromCart(int userId, int productId)
//        {
//            // Retrieve the user from the database
//            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
//                                      .SingleOrDefault(u => u.Id == userId);

//            if (user == null)
//            {
//                return NotFound("User not found.");
//            }

//            // Check if the user has a cart
//            if (user.Cart == null)
//            {
//                return NotFound("Cart not found for the user.");
//            }

//            // Get the cart items for the user's cart
//            var cartItems = user.Cart.CartItems;

//            // Find the cart item corresponding to the productId
//            var cartItemToRemove = cartItems.FirstOrDefault(ci => ci.ProductId == productId);

//            if (cartItemToRemove == null)
//            {
//                return NotFound("Product not found in the user's cart.");
//            }

//            // Remove the cart item from the cart
//            user.Cart.CartItems.Remove(cartItemToRemove);

//            // Save changes to the database
//            _context.SaveChanges();

//            return Ok(1);
//        }
//        [HttpPut("{userId}/products/{productId}/UpdateQuantity")]
//        public IActionResult UpdateCartQuantity(int userId, int productId, [FromBody] int newQuantity)
//        {
//            // Retrieve the user from the database
//            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
//                                      .SingleOrDefault(u => u.Id == userId);

//            if (user == null)
//            {
//                return NotFound("User not found.");
//            }

//            // Check if the user has a cart
//            if (user.Cart == null)
//            {
//                return NotFound("Cart not found for the user.");
//            }

//            // Get the cart items for the user's cart
//            var cartItems = user.Cart.CartItems;

//            // Find the cart item corresponding to the productId
//            var cartItemToUpdate = cartItems.FirstOrDefault(ci => ci.ProductId == productId);

//            if (cartItemToUpdate == null)
//            {
//                return NotFound("Product not found in the user's cart.");
//            }

//            // Retrieve the product from the database
//            var product = _context.Products.Find(productId);

//            if (product == null)
//            {
//                return NotFound("Product not found.");
//            }

//            // Check if the new quantity exceeds the available quantity in the product table
//            if (newQuantity > product.Quantity)
//            {
//                return BadRequest("Requested quantity exceeds available quantity.");
//            }

//            // Update the quantity of the cart item
//            cartItemToUpdate.Quantity = newQuantity;

//            // Save changes to the database
//            _context.SaveChanges();

//            return NoContent();
//        }

//        [HttpDelete("{id}")]
//        public IActionResult DeleteCart(int id)
//        {
//            var cart = _context.Carts.Include(c => c.CartItems).SingleOrDefault(c => c.Id == id);

//            if (cart == null)
//            {
//                return NotFound("Cart not found.");
//            }

//            _context.ShoppingCartItems.RemoveRange(cart.CartItems);
//            _context.Carts.Remove(cart);
//            _context.SaveChanges();

//            return Ok(cart.CartItems);
//        }

//        [HttpDelete("userID")]

//        public async Task<IActionResult> DeleteUser(int id)
//        {
//            var user = await _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems).FirstOrDefaultAsync(u => u.Id == id);
//            if (user == null)
//            {
//                return NotFound();
//            }

//            _context.Users.Remove(user);

//            // If the user has a cart, remove it along with its cart items
//            if (user.Cart != null)
//            {
//                _context.ShoppingCartItems.RemoveRange(user.Cart.CartItems);
//                _context.Carts.Remove(user.Cart);
//            }

//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateException)
//            {
//                return StatusCode(500, "Failed to delete the user.");
//            }

//            return NoContent();
//        }

//        [HttpPut("{userId}/UpdateAllProducts")]
//        public IActionResult UpdateAllProductsInCart(int userId, [FromBody] Product[] updatedProducts)
//        {
//            // Retrieve the user from the database
//            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
//                                      .SingleOrDefault(u => u.Id == userId);

//            if (user == null)
//            {
//                return NotFound("User not found.");
//            }

//            // Check if the user has a cart
//            if (user.Cart == null)
//            {
//                return NotFound("Cart not found for the user.");
//            }

//            // Get the cart items for the user's cart
//            var cartItems = user.Cart.CartItems;

//            // Update all products in the cart items
//            foreach (var updatedProduct in updatedProducts)
//            {
//                // Retrieve the cart item from the user's cart
//                var cartItem = cartItems.FirstOrDefault(ci => ci.ProductId == updatedProduct.Id);

//                if (cartItem != null)
//                {
//                    // Retrieve the corresponding product from the database
//                    var product = _context.Products.Find(updatedProduct.Id);

//                    if (product != null)
//                    {
//                        // Check if the updated quantity exceeds the available quantity in the product table
//                        if (updatedProduct.Quantity > product.Quantity)
//                        {
//                            return BadRequest($"Requested quantity for product {product.Id} exceeds available quantity.");
//                        }

//                        // Update the quantity of the cart item
//                        cartItem.Quantity = updatedProduct.Quantity;

//                        // Mark the cart item as modified
//                        _context.Entry(cartItem).State = EntityState.Modified;
//                    }
//                    else
//                    {
//                        return NotFound($"Product {updatedProduct.Id} not found.");
//                    }
//                }
//                else
//                {
//                    return NotFound($"Product {updatedProduct.Id} not found in the user's cart.");
//                }
//            }

//            // Save changes to the database
//            _context.SaveChanges();

//            return NoContent();
//        }

//        //[HttpGet("QyantityInCartItems")]

//        //public IActionResult getQyantityInCartItems()

//        //    public void Dispose()
//        //    {
//        //        _context.Dispose();
//        //    }

//        //// GET: api/Carts
//        //[HttpGet]
//        //    public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
//        //    {
//        //        return await _context.Carts.ToListAsync();
//        //    }

//        //    // GET: api/Carts/5
//        //    [HttpGet("{id}")]
//        //    public async Task<ActionResult<Cart>> GetCart(int id)
//        //    {
//        //        var cart = await _context.Carts.FindAsync(id);

//        //        if (cart == null)
//        //        {
//        //            return NotFound();
//        //        }

//        //        return cart;
//        //    }

//        //    // PUT: api/Carts/5
//        //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        //    [HttpPut("{id}")]
//        //    public async Task<IActionResult> PutCart(int id, Cart cart)
//        //    {
//        //        if (id != cart.Id)
//        //        {
//        //            return BadRequest();
//        //        }

//        //        _context.Entry(cart).State = EntityState.Modified;

//        //        try
//        //        {
//        //            await _context.SaveChangesAsync();
//        //        }
//        //        catch (DbUpdateConcurrencyException)
//        //        {
//        //            if (!CartExists(id))
//        //            {
//        //                return NotFound();
//        //            }
//        //            else
//        //            {
//        //                throw;
//        //            }
//        //        }

//        //        return NoContent();
//        //    }

//        //    // POST: api/Carts
//        //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//        //    [HttpPost]
//        //    public async Task<ActionResult<Cart>> PostCart(Cart cart)
//        //    {
//        //        _context.Carts.Add(cart);
//        //        await _context.SaveChangesAsync();

//        //        return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
//        //    }

//        //    // DELETE: api/Carts/5
//        //    [HttpDelete("{id}")]
//        //    public async Task<IActionResult> DeleteCart(int id)
//        //    {
//        //        var cart = await _context.Carts.FindAsync(id);
//        //        if (cart == null)
//        //        {
//        //            return NotFound();
//        //        }

//        //        _context.Carts.Remove(cart);
//        //        await _context.SaveChangesAsync();

//        //        return NoContent();
//        //    }

//        //    private bool CartExists(int id)
//        //    {
//        //        return _context.Carts.Any(e => e.Id == id);
//        //    }
//    }
//}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiProject.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ApiProject.Models;


namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly pharmDbcontext _context;
        int _id = 2;
        public CartsController(pharmDbcontext context)
        {
            _context = context;
        }

        

        [HttpGet("productid,userID")]
        public IActionResult AddToCart(int productId, int userID)

        {
            // Retrieve the user from the database
            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
                                      .SingleOrDefault(u => u.Id == userID);

            if (user == null)
            {
                return BadRequest("User not found. Please sign up or log in to continue.");
            }

            // If the user doesn't have a cart, create a new one
            var cart = user.Cart ?? CreateUserCart(user);

            // Retrieve the product from the database
            var product = _context.Products.SingleOrDefault(p => p.Id == productId);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Check if the product already exists in the cart
            var cartItem = cart.CartItems.FirstOrDefault(c => c.ProductId == productId);
            //Console.WriteLine((++_id).ToString());
            if (cartItem == null)
            {
                _id = 5;
                // Create a new cart item if it doesn't exist
                cartItem = new CartItem
                {

                    //ItemId = (_id).ToString(),

                    ProductId = productId,
                    CartId = user.Cart.Id,
                    Quantity = 1,
                    //DateCreated = DateTime.Now (if DateCreated is required)
                };


                cart.CartItems.Add(cartItem);
                _context.ShoppingCartItems.Add(cartItem);
                _context.Entry(cartItem).State = EntityState.Added;
                //_context.SaveChanges(); // Commit the changes

            }
            else
            {
                // If the item exists in the cart, increment the quantity
                //cartItem.Quantity++;
                //_context.Entry(cartItem).State = EntityState.Modified;
                return BadRequest("Product already exists in the cart. Quantity incremented.");
            }

            // Save changes to the database
            _context.SaveChanges();

            return Ok(cartItem);
        }

        private Cart CreateUserCart(User user)
        {
            var cart = new Cart();
            user.Cart = cart;
            _context.SaveChanges(); // Save changes to create the cart
            return cart;
        }

        [HttpGet("{userId}/products")]
        public IActionResult GetCartProducts(int userId)
        {
            // Retrieve the user from the database
            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
                                      .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user has a cart
            if (user.Cart == null)
            {
                CreateUserCart(user);
            }

            // Get the cart items for the user's cart
            var cartItems = user.Cart.CartItems;

            // Create a list to hold cart item details
            var cartItemDetails = new List<object>();

            // Iterate through each cart item and retrieve details
            foreach (var cartItem in cartItems)
            {
                // Retrieve product details for the current cart item
                var product = _context.Products
                                        .Where(p => p.Id == cartItem.ProductId)
                                        .Select(p => new
                                        {
                                            p.Id,
                                            p.Name,
                                            p.Image,
                                            p.Description,
                                            p.Price,
                                            CartItemId = cartItem.ItemId, // Add CartItemId to identify cart item
                                            cartItem.Quantity // Add Quantity from the cart item
                                        })
                                        .FirstOrDefault();

                if (product != null)
                {
                    // Add cart item details to the list
                    cartItemDetails.Add(product);
                }
            }

            return Ok(cartItemDetails);
        }
        //[HttpGet("{userId}/products")]
        //public IActionResult GetCartProducts(int userId)
        //{
        //    // Retrieve the user from the database
        //    var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
        //                              .SingleOrDefault(u => u.Id == userId);

        //    if (user == null)
        //    {
        //        return NotFound("User not found.");
        //    }

        //    // Get the cart items for the user's cart
        //    if (user.Cart.CartItems != null)
        //    {

        //        var cartItems = user.Cart.CartItems;

        //        // Create a list to hold cart item details
        //        var cartItemDetails = new List<object>();

        //        // Iterate through each cart item and retrieve details
        //        foreach (var cartItem in cartItems)
        //        {
        //            // Retrieve product details for the current cart item
        //            var product = _context.Products
        //                                    .Where(p => p.Id == cartItem.ProductId)
        //                                    .Select(p => new
        //                                    {
        //                                        p.Id,
        //                                        p.Name,
        //                                        p.Description,
        //                                        p.Price,
        //                                        p.Image,
        //                                        CartItemId = cartItem.ItemId, // Add CartItemId to identify cart item
        //                                        cartItem.Quantity // Add Quantity from the cart item
        //                                    })
        //                                    .FirstOrDefault();

        //            if (product != null)
        //            {
        //                // Add cart item details to the list
        //                cartItemDetails.Add(product);
        //            }
        //        }

        //        return Ok(cartItemDetails);
        //    }
        //    else if(user.Cart.CartItems == null)
        //    {
        //        var cartItemDetails = new List<object>();
        //        return Ok(cartItemDetails);
        //    }
        //    else { return BadRequest(); }
        //}


        [HttpDelete("{userId}/products/{productId}")]
        public IActionResult RemoveProductFromCart(int userId, int productId)
        {
            // Retrieve the user from the database
            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
                                      .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user has a cart
            if (user.Cart == null)
            {
                return NotFound("Cart not found for the user.");
            }

            // Get the cart items for the user's cart
            var cartItems = user.Cart.CartItems;

            // Find the cart item corresponding to the productId
            var cartItemToRemove = cartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItemToRemove == null)
            {
                return NotFound("Product not found in the user's cart.");
            }

            // Remove the cart item from the cart
            user.Cart.CartItems.Remove(cartItemToRemove);

            // Save changes to the database
            _context.SaveChanges();

            return Ok(1);
        }
        [HttpPut("{userId}/products/{productId}/UpdateQuantity")]
        public IActionResult UpdateCartQuantity(int userId, int productId, [FromBody] int newQuantity)
        {
            // Retrieve the user from the database
            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
                                      .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user has a cart
            if (user.Cart == null)
            {
                return NotFound("Cart not found for the user.");
            }

            // Get the cart items for the user's cart
            var cartItems = user.Cart.CartItems;

            // Find the cart item corresponding to the productId
            var cartItemToUpdate = cartItems.FirstOrDefault(ci => ci.ProductId == productId);

            if (cartItemToUpdate == null)
            {
                return NotFound("Product not found in the user's cart.");
            }

            // Retrieve the product from the database
            var product = _context.Products.Find(productId);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Check if the new quantity exceeds the available quantity in the product table
            if (newQuantity > product.Quantity)
            {
                return BadRequest("Requested quantity exceeds available quantity.");
            }

            // Update the quantity of the cart item
            cartItemToUpdate.Quantity = newQuantity;

            // Save changes to the database
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCart(int id)
        {
            var cart = _context.Carts.Include(c => c.CartItems).SingleOrDefault(c => c.Id == id);

            if (cart == null)
            {
                return NotFound("Cart not found.");
            }

            _context.ShoppingCartItems.RemoveRange(cart.CartItems);
            _context.Carts.Remove(cart);
            _context.SaveChanges();

            return Ok(cart.CartItems);
        }

        [HttpDelete("userID")]

        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);

            // If the user has a cart, remove it along with its cart items
            if (user.Cart != null)
            {
                _context.ShoppingCartItems.RemoveRange(user.Cart.CartItems);
                _context.Carts.Remove(user.Cart);
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Failed to delete the user.");
            }

            return NoContent();
        }

        [HttpPut("{userId}/UpdateAllProducts")]
        public IActionResult UpdateAllProductsInCart(int userId, [FromBody] Product[] updatedProducts)
        {
            // Retrieve the user from the database
            var user = _context.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems)
                                      .SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user has a cart
            if (user.Cart == null)
            {
                return NotFound("Cart not found for the user.");
            }

            // Get the cart items for the user's cart
            var cartItems = user.Cart.CartItems;

            // Update all products in the cart items
            foreach (var updatedProduct in updatedProducts)
            {
                // Retrieve the cart item from the user's cart
                var cartItem = cartItems.FirstOrDefault(ci => ci.ProductId == updatedProduct.Id);

                if (cartItem != null)
                {
                    // Retrieve the corresponding product from the database
                    var product = _context.Products.Find(updatedProduct.Id);

                    if (product != null)
                    {
                        // Check if the updated quantity exceeds the available quantity in the product table
                        if (updatedProduct.Quantity > product.Quantity)
                        {
                            return BadRequest($"Requested quantity for product {product.Id} exceeds available quantity.");
                        }

                        // Update the quantity of the cart item
                        cartItem.Quantity = updatedProduct.Quantity;

                        // Mark the cart item as modified
                        _context.Entry(cartItem).State = EntityState.Modified;
                    }
                    else
                    {
                        return NotFound($"Product {updatedProduct.Id} not found.");
                    }
                }
                else
                {
                    return NotFound($"Product {updatedProduct.Id} not found in the user's cart.");
                }
            }

            // Save changes to the database
            _context.SaveChanges();

            return NoContent();
        }

        //[HttpGet("QyantityInCartItems")]

        //public IActionResult getQyantityInCartItems()

        //    public void Dispose()
        //    {
        //        _context.Dispose();
        //    }

        //// GET: api/Carts
        //[HttpGet]
        //    public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        //    {
        //        return await _context.Carts.ToListAsync();
        //    }

        //    // GET: api/Carts/5
        //    [HttpGet("{id}")]
        //    public async Task<ActionResult<Cart>> GetCart(int id)
        //    {
        //        var cart = await _context.Carts.FindAsync(id);

        //        if (cart == null)
        //        {
        //            return NotFound();
        //        }

        //        return cart;
        //    }

        //    // PUT: api/Carts/5
        //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //    [HttpPut("{id}")]
        //    public async Task<IActionResult> PutCart(int id, Cart cart)
        //    {
        //        if (id != cart.Id)
        //        {
        //            return BadRequest();
        //        }

        //        _context.Entry(cart).State = EntityState.Modified;

        //        try
        //        {
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!CartExists(id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }

        //        return NoContent();
        //    }

        //    // POST: api/Carts
        //    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //    [HttpPost]
        //    public async Task<ActionResult<Cart>> PostCart(Cart cart)
        //    {
        //        _context.Carts.Add(cart);
        //        await _context.SaveChangesAsync();

        //        return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        //    }

        //    // DELETE: api/Carts/5
        //    [HttpDelete("{id}")]
        //    public async Task<IActionResult> DeleteCart(int id)
        //    {
        //        var cart = await _context.Carts.FindAsync(id);
        //        if (cart == null)
        //        {
        //            return NotFound();
        //        }

        //        _context.Carts.Remove(cart);
        //        await _context.SaveChangesAsync();

        //        return NoContent();
        //    }

        //    private bool CartExists(int id)
        //    {
        //        return _context.Carts.Any(e => e.Id == id);
        //    }
    }
}
