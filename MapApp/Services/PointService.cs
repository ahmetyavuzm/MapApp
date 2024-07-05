
using System.Data;
using System.Data.Common;

namespace MapApp;

public class PointService : IPointService
{
    private readonly string table_name;
    private readonly IDBService _dBService;
    public PointService(IDBService dBService)
    {
        this.table_name = "Points";
        this._dBService = dBService;

    }

    public async Task<Point?> Add(PointBodyView view)
    {
        string query = $"INSERT INTO \"{this.table_name}\" (\"X\",\"Y\",\"Name\") VALUES ({view.X}, {view.Y}, '{view.Name}') RETURNING \"Id\"";
        var response = await this._dBService.ExecuteDatabaseOperations(async (command) => {
            command.CommandText = query;
            var res =  await command.ExecuteScalarAsync();
            
            if (res == null){
                return null as Point;
            }
            
            int id = Convert.ToInt32(res);

            return new Point(id,view.Name,view.X,view.Y);
        });


        if (response == null){
            return null;
        }
        return response;
    }

    public async Task<Point?> Update(int id,PointBodyView view)
    {
        string query = $"UPDATE \"{this.table_name}\" SET \"X\" = {view.X}, \"Y\" = {view.Y}, \"Name\" = '{view.Name}' WHERE \"Id\" = {id} RETURNING \"Id\"";
        var response = await this._dBService.ExecuteDatabaseOperations(async (command) => {
            command.CommandText = query;
            var res =  await command.ExecuteScalarAsync();
            if (res == null){
                return null as Point;
            }
            int id = Convert.ToInt32(res);

            return new Point(id,view.Name,view.X,view.Y);
        });

        if (response == null){
            return null;
        }
        return response;
    }

    public async Task<Point?> Delete(int id)
    {
        var response = await this._dBService.ExecuteDatabaseOperations(async (command) => {
            command.CommandText = $"DELETE FROM \"{this.table_name}\" WHERE \"Id\" = {id} RETURNING *";
            using (var reader = await command.ExecuteReaderAsync()){
                if (await reader.ReadAsync()){
                    return MapToEntity(reader);
                }else{
                    return null;
                }
            }
        });

        if (response == null){
            return null;
        }else{
            return response;
        }
    }

    public async Task<List<Point>?> GetAll()
    {
        var response = await this._dBService.ExecuteDatabaseOperations(async (command) => {
            command.CommandText = $"SELECT * FROM \"{this.table_name}\"";
            using (var reader = await command.ExecuteReaderAsync()){
                List<Point> entities = new List<Point>();
                while (await reader.ReadAsync()){
                    entities.Add(MapToEntity(reader));
                }
                return entities;
            }

        });

        if (response == null){
            return null;
        }else{
            return response;
        }
    }

    public async Task<Point?> GetById(int id)
    {
        var response = await this._dBService.ExecuteDatabaseOperations(async (command) => {
            command.CommandText = $"SELECT * FROM \"{this.table_name}\" WHERE \"Id\" = {id}";
            using (var reader = await command.ExecuteReaderAsync()){
                if (await reader.ReadAsync()){
                    return MapToEntity(reader);
                }else{
                    return null;
                }
            }
        });

        if (response == null){
            return null;
        }else{
            return response;
        }
    }

    private Point MapToEntity(DbDataReader reader)
    {
        Point point = new Point(
            reader.GetInt32(0),
            reader.GetString(3),
            reader.GetDouble(1),
            reader.GetDouble(2)

        );
        return point;
    }

}
