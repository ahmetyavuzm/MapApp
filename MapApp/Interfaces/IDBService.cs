using System.Data.Common;

namespace MapApp.Interfaces;

public interface IDBService
{
    public Task<R?> ExecuteDatabaseOperations<R>(Func<DbCommand, Task<R?>> expression) where R : class;
}
