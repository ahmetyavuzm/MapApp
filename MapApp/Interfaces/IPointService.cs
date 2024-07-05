namespace MapApp;

public interface IPointService
{
    Task<List<Point>?> GetAll();
    Task<Point?> GetById(int id);
    Task<Point?> Add(PointBodyView point);
    Task<Point?> Update(int id, PointBodyView point);
    Task<Point?> Delete(int id);
}
