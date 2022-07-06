using AutoMapper;
using Blackjack.Web.App.BusinessEntities.User;
using Blackjack.Web.App.Data;
using Blackjack.Web.App.Data.Entities;
using System.Linq;

namespace Blackjack.Web.App.Facades;

public interface IUserFacade
{
    /// <summary>
    /// Adds a user to the Users table if it does not 
    /// already exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task CreateUser(string username, string soundex, int balance);
    /// <summary>
    /// Retrieves a user from the Users table. Returns null if
    /// the user does not exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task<List<UserBE>> GetUsers(string username);
}

/// <inheritdoc cref="IUserFacade"/>
public class UserFacade : IUserFacade
{
    private readonly IDataService _dataService;
    private readonly IMapper _mapper;

    public UserFacade(IDataService dataService, IMapper mapper)
    {
        _dataService = dataService;
        _mapper = mapper;
    }

    public async Task CreateUser(string username, string soundex, int balance)
    {
        UserEntity user = new UserEntity()
        {
            Username = username,
            UserSoundex = soundex,
            Balance = balance
        };
        await _dataService.UserRepo.CreateUser(user);
    }

    public async Task<List<UserBE>> GetUsers(string soundex)
    {
        List<UserEntity> userEntities = await _dataService.UserRepo.GetUsersBySoundex(soundex);
        List<UserBE> UserBEs = userEntities?.Select(userEntity => _mapper.Map<UserBE>(userEntity)).ToList();
        return UserBEs;
    }
}
