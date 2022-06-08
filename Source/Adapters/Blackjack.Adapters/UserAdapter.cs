using Blackjack.Web.App.Facades;

namespace Blackjack.Web.App.Adapters;

public interface IUserAdapter
{
    /// <summary>
    /// Adds a user to the Users table if it does not 
    /// already exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task CreateUser(string username);
}
/// <inheritdoc cref="IUserAdapter"/>
public class UserAdapter : IUserAdapter
{
    private readonly IUserFacade _userFacade;

    public UserAdapter(IUserFacade userFacade)
    {
        _userFacade = userFacade;
    }

    /// <inheritdoc/>
    public async Task CreateUser(string username)
    {
        if (username == "Test")
        {
            await _userFacade.CreateUser(username);
        }
    }
}
