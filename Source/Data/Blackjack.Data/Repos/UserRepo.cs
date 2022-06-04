namespace Blackjack.Web.App.Data.Repos;

public interface IUserRepo
{
    void Test();
}

public class UserRepo : BaseRepo, IUserRepo
{
    public UserRepo(BaseDataService dataService) : base(dataService)
    {
    }

    public new void Test()
    {
        base.Test();
    }
}


