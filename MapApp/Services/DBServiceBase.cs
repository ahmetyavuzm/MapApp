using System.Data.Common;
using MapApp;


public abstract class DBServiceBase: IDBService
{
    protected readonly string _connectionString;
    public DBServiceBase(IConfiguration configuration, string connectionName)
    {
        _connectionString = configuration.GetConnectionString(connectionName);
    }
    public abstract Task<R?> ExecuteDatabaseOperations<R>(Func<DbCommand, Task<R?>> expression) where R : class;
}
