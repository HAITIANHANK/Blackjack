using Blackjack.Web.App.Data;

namespace Blackjack.Web.App.Facades;

public interface IUserFacade
{
    void Test();
}

public class UserFacade : IUserFacade
{
    private readonly IDataService _dataService;

    public UserFacade(IDataService dataService)
    {
        _dataService = dataService;
    }

    public void Test()
    {
        _dataService.UserRepo.Test();
    }
}
