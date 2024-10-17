using ApiProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace ApiProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        pharmDbcontext database;
        public UserController(pharmDbcontext _database)
        {
            database = _database;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var q = database.Users.ToList();
            return Ok(q);
        }
        [HttpGet("email")]
        public IActionResult GetEmail(string email)
        {
            var user = database.Users.FirstOrDefault(u => u.Email == email);
            if (user != null)
            {
                return Ok(true); // User with the given email exists
            }
            else
            {
                return Ok(false); // User with the given email does not exist
            }
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var q = database.Users.Find(id);
            if (q != null)
            {
                return Ok(q);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("login")] // Changed the route to differentiate from the Get method
        public IActionResult GetLogin(string email, string password) // Changed passward to password
        {
            var user = database.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
            if (user != null)
            {
                return Ok(new { user, user.Id });
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("current")]
        [Authorize] // Requires authentication
        public IActionResult GetCurrent()
        {
            // Get the current user ID from the authenticated user's claims
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "userId");
            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                var currentUser = database.Users.Find(userId);
                if (currentUser != null)
                {
                    return Ok(currentUser);
                }
            }

            return NotFound(); // If user not found or not authenticated
        }

        // Other action methods for adding, editing, and deleting users...
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(User user)
        {
            try
            {
                // Validate the user data (you may need additional validation logic)
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Add the user to the database
                database.Users.Add(user);
                await database.SaveChangesAsync();

                return Ok(user);
            }
            catch (DbUpdateException)
            {
                // Handle database update errors
                return StatusCode(500, "Failed to register user. Please try again.");
            }
        }
    

    [HttpPost]
        public IActionResult Add(User user)
        {
            if (user != null)
            {
                database.Users.Add(user);
                database.SaveChanges();
                return Ok(user);

            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPut("{id}")]
        public IActionResult Edit(int id, User user)
        {
            var user2 = database.Users.Find(id);
            if (user2 != null)
            {
                user2.Address = user.Address;
                user2.Email = user.Email;
                user2.Phone = user.Phone;
                user2.Password = user.Password;
                user2.Name = user.Name;
                user2.Cart = user.Cart;
                database.SaveChanges();
                return Ok(user);
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            //var q=database.Users.Find(id);
            //if(q != null)
            //{
            //    var userCartItems = database.Carts.Where(c => c.UserId == id);
            //    database.Carts.RemoveRange(userCartItems);

            //    database.Users.Remove(q);
            //    database.SaveChanges();
            //    return Ok(q);
            //}
            //else
            //{
            //    return BadRequest();
            //}

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var q = database.Users.Find(id);
            if (q != null)
            {
                var json = JsonSerializer.Serialize(q, options);
                database.Users.Remove(q);
                database.SaveChanges();
                return Ok(json);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
