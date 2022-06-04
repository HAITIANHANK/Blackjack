namespace Blackjack.Web.App.Data.Repos;

public abstract class BaseRepo
{
    private readonly BaseDataService _dataService;

    protected BaseRepo(BaseDataService dataService)
    {
        _dataService = dataService;
    }

    protected void Test()
    {

    }
}
