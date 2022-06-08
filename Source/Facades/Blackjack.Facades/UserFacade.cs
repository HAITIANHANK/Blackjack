using Blackjack.Web.App.Data;

namespace Blackjack.Web.App.Facades;

public interface IUserFacade
{
    /// <summary>
    /// Adds a user to the Users table if it does not 
    /// already exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task CreateUser(string username);
}

/// <inheritdoc cref="IUserFacade"/>
public class UserFacade : IUserFacade
{
    private readonly IDataService _dataService;

    public UserFacade(IDataService dataService)
    {
        _dataService = dataService;
    }

    public async Task CreateUser(string username)
    {
        await _dataService.UserRepo.CreateUser(username);
    }
}
