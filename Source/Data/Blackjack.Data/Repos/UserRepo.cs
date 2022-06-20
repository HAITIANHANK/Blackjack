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
    Task CreateUser(string username);

    /// <summary>
    /// Retrieves a user from the Users table. Returns null if
    /// the user does not exist.
    /// </summary>
    /// <param name="username"></param>
    /// <returns></returns>
    Task<UserEntity> GetUser(string username);
}

/// <inheritdoc cref="IUserRepo"/>
public class UserRepo : BaseRepo, IUserRepo
{
    public UserRepo(BaseDataService dataService) : base(dataService)
    {
    }

    public async Task CreateUser(string username)
    {
        List<SqlParameter> parameters = new List<SqlParameter>();
        await base.Create(StoredProcedures.Test, parameters);
    }

    public async Task<UserEntity> GetUser(string username)
    {
        List<SqlParameter> parameters = new List<SqlParameter>();

        DataTable queryData = await base.Get(StoredProcedures.Test, parameters);

        List<UserEntity> userEntities = CreateUserEntity(queryData);

        return userEntities.SingleOrDefault();
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
                Soundex = row.Field<string>(nameof(UserEntity.Soundex)),
                Balance = row.Field<int>(nameof(UserEntity.Balance))
            };
            userEntities.Add(entity);
        }
        return userEntities;
    }
    private struct StoredProcedures
    {
        public const string Test = "Test";
    }
}


