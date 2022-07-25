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
    /// <param name="soundex"></param>
    /// <param name="balance"></param>
    /// <returns></returns>
    Task CreateUser(string username, string soundex, int balance);
    /// <summary>
    /// Retrieves a user from the Users table. Returns null if
    /// the user does not exist.
    /// </summary>
    /// <param name="soundex"></param>
    /// <returns></returns>
    Task<List<UserBE>> GetUsers(string soundex);

    /// <summary>
    /// Updates a user in the Users table. Returns null if that
    /// user does not exist.
    /// </summary>
    /// <param name="userBE"></param>
    /// <returns></returns>
    Task<List<UserBE>> UpdateUser(UserBE userBE);
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

    public async Task<List<UserBE>> UpdateUser(UserBE userBE)
    {
        UserEntity userEntity = _mapper.Map<UserEntity>(userBE);
        List<UserEntity> userEntities = await _dataService.UserRepo.UpdateUser(userEntity);
        List<UserBE> UserBEs = userEntities?.Select(updatedUserEntity => _mapper.Map<UserBE>(updatedUserEntity)).ToList();
        return UserBEs;
    }
}
