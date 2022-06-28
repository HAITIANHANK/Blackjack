using Blackjack.Web.App.Data.Entities;
using System.Data;
using System.Data.SqlClient;

namespace Blackjack.Web.App.Data.Repos;

public interface IUserRepo
{
    /// <summary>
    /// Adds the user to the Users table if that user does not
    /// already exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task CreateUser(UserEntity user);

    /// <summary>
    /// Retrieves a user from the Users table. Returns null if
    /// the user does not exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task<List<UserEntity>> GetUsersBySoundex(string soundex);
}

/// <inheritdoc cref="IUserRepo"/>
public class UserRepo : BaseRepo, IUserRepo
{
    public UserRepo(BaseDataService dataService) : base(dataService)
    {
    }

    public async Task CreateUser(UserEntity user)
    {
        List<SqlParameter> parameters = new List<SqlParameter>()
        {
            new SqlParameter()
            {
                ParameterName = $"@{nameof(user.Username)}",
                SqlDbType = SqlDbType.VarChar,
                Value = user.Username
            },
            new SqlParameter()
            {
                ParameterName = $"@{nameof(user.UserSoundex)}",
                SqlDbType = SqlDbType.VarChar,
                Value = user.UserSoundex
            },
            new SqlParameter()
            {
                ParameterName = $"@{nameof(user.Balance)}",
                SqlDbType = SqlDbType.Int,
                Value = user.Balance
            }
        };
        await base.Create(StoredProcedures.CreateUser, parameters);
    }

    public async Task<List<UserEntity>> GetUsersBySoundex(string soundex)
    {
        List<SqlParameter> parameters = new List<SqlParameter>()
        {
            new SqlParameter()
            {
                ParameterName = $"@{nameof(UserEntity.UserSoundex)}",
                SqlDbType = SqlDbType.VarChar,
                Value = soundex
            }
        };

        DataTable queryData = await base.Get(StoredProcedures.GetUser, parameters);

        List<UserEntity> userEntities = CreateUserEntity(queryData);

        return userEntities;
    }
    private List<UserEntity> CreateUserEntity(DataTable userDataTable)
    {
        List<UserEntity> userEntities = new List<UserEntity>();

        if (userDataTable.Rows.Count == 0)
            return null;

        foreach (DataRow row in userDataTable.Rows)
        {
            UserEntity entity = new UserEntity()
            {
                UserID = row.Field<int>(nameof(UserEntity.UserID)),
                Username = row.Field<string>(nameof(UserEntity.Username)),
                UserSoundex = row.Field<string>(nameof(UserEntity.UserSoundex)),
                Balance = row.Field<int>(nameof(UserEntity.Balance))
            };
            userEntities.Add(entity);
        }
        return userEntities;
    }
    private struct StoredProcedures
    {
        public const string CreateUser = "user.usp_INSERT_User";
        public const string GetUser = "user.usp_SELECT_Users_BySoundex";
    }
}


