using MapApp.Entities;
using MapApp.DTOs;

namespace MapApp.Interfaces;

public interface IPointService
{
    Task<List<Point>?> GetAll();
    Task<Point?> GetById(int id);
    Task<Point?> Add(PointDTO pointDto);
    Task<Point?> Update(int id, PointDTO pointDto);
    Task<Point?> Delete(int id);
}
