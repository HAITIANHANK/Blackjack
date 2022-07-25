using Blackjack.Web.App.Adapters;
using Blackjack.Web.App.BusinessEntities.User;
using Blackjack.Web.App.BusinessModels.User;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Blackjack.Web.App.WebService.Controllers;

[Route("[controller]/[action]")]
public class UserController : Controller
{
    private readonly IUserAdapter _userAdapter;
    private readonly IMapper _mapper;

    public UserController(IUserAdapter userAdapter, IMapper mapper)
    {
        _userAdapter = userAdapter;
        _mapper = mapper;
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

    [HttpGet]
    public async Task<ActionResult<UserBM>> GetUser([FromQuery] string username)
    {
        UserBE user = await _userAdapter.GetUsers(username);
        UserBM result = user == null ? null : _mapper.Map<UserBM>(user);
        return Ok(result);
    }

    public async Task<ActionResult<UserBM>> UpdateUser([FromBody] UserBM user)
    {
        UserBE userBE = _mapper.Map<UserBE>(user);
        UserBE updatedUserBE = await _userAdapter.UpdateUser(userBE);
        UserBM updatedUserBM = updatedUserBE == null ? null : _mapper.Map<UserBM>(updatedUserBE);
        return Ok(updatedUserBM);
    }
}
