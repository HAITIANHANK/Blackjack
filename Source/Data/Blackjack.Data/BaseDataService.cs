using System.Data.SqlClient;

namespace Blackjack.Web.App.Data;

public abstract class BaseDataService
{
    private readonly string _connStr;

    public BaseDataService(string connStr)
    {
        _connStr = connStr;
    }

    public SqlConnection GetConnection()
    {
        return new SqlConnection(_connStr);
    }
}
