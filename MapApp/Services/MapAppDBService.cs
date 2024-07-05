using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Npgsql;
using System.Data.Common;

namespace MapApp;


public class MapAppDBService : DBServiceBase
{
    public MapAppDBService(IConfiguration configuration) : base(configuration, "MyPostgresConnection")
    {
    }

    public override async Task<R?> ExecuteDatabaseOperations<R>(Func<DbCommand, Task<R?>> expression) where R : class{
        using (var connection = new NpgsqlConnection(_connectionString)){
            await connection.OpenAsync();
            using (var command = new NpgsqlCommand()){
                command.Connection = connection;
                return await expression(command);
            }
        };
    }       
}
