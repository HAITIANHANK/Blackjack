using Blackjack.Web.App.Adapters;
using Microsoft.AspNetCore.Mvc;

namespace Blackjack.Web.App.WebService.Controllers;

public class UserController : Controller
{
    private readonly IUserAdapter _userAdapter;

    public UserController(IUserAdapter userAdapter)
    {
        _userAdapter = userAdapter;
    }


    [HttpGet]
    public void Test()
    {
        _userAdapter.Test();
    }
}
