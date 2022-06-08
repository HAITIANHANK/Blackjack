using Blackjack.Web.App.Adapters;
using Microsoft.AspNetCore.Mvc;

namespace Blackjack.Web.App.WebService.Controllers;

[Route("[controller]/[action]")]
public class UserController : Controller
{
    private readonly IUserAdapter _userAdapter;

    public UserController(IUserAdapter userAdapter)
    {
        _userAdapter = userAdapter;
    }
    /// <summary>
    /// Adds a user to the Users table if it does not 
    /// already exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult> CreateUser([FromQuery] string username)
    {
        await _userAdapter.CreateUser(username);
        return Ok();
    }
}
