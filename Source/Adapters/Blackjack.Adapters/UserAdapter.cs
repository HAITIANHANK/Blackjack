using Blackjack.Web.App.Facades;

namespace Blackjack.Web.App.Adapters;

public interface IUserAdapter
{
    void Test();
}

public class UserAdapter : IUserAdapter
{
    private readonly IUserFacade _userFacade;

    public UserAdapter(IUserFacade userFacade)
    {
        _userFacade = userFacade;
    }

    public void Test()
    {
        _userFacade.Test();
    }
}
