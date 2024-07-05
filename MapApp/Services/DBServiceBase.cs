using System.Data.Common;
using MapApp;
using MapApp.Interfaces;


namespace MapApp.Services;


public abstract class DBServiceBase: IDBService
{
    protected readonly string _connectionString;
    public DBServiceBase(IConfiguration configuration, string connectionName)
    {
        try
        {
            _connectionString = configuration.GetConnectionString(connectionName);
        }
        catch (Exception e)
        {
            throw new Exception("Error while reading connection string from configuration", e);
        }
    }
    public abstract Task<R?> ExecuteDatabaseOperations<R>(Func<DbCommand, Task<R?>> expression) where R : class;
}

