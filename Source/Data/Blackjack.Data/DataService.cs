using Blackjack.Web.App.Data.Repos;
using Microsoft.Extensions.DependencyInjection;

namespace Blackjack.Web.App.Data;

public interface IDataService
{
    IUserRepo UserRepo { get; }
}

public class DataService : BaseDataService, IDataService
{
    private IUserRepo _userRepo;
    public DataService(string connStr) : base(connStr)
    {
    }

    public IUserRepo UserRepo => _userRepo ??= new UserRepo(this);
}

public static class DataServiceExt
{

    public static void AddDataService(this IServiceCollection services, string connStr)
    {
        services.AddScoped<IDataService, DataService>(_ => new DataService(connStr));
    }
}
