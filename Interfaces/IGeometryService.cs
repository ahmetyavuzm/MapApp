
using MapApp.DTOs;
using MapApp.Entities;
namespace MapApp.Interfaces;

public interface IGeometryService: IEntityService<Geometry, int>
{

    Task<List<Geometry>> GetUserGeometries(string userId);

    Task<Geometry?> Update(int id, Geometry geometry);

}
