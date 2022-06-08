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

    private struct StoredProcedures
    {
        public const string Test = "Test";
    }
}


