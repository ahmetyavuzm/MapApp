namespace MapApp;

public interface IPointController
{
    Task<Response<List<Point>>> GetAll();
    Task<Response<Point>> GetById(int id);
    Task<Response<Point>> Add(PointBodyView point);
    Task<Response<Point>> Update(int id, PointBodyView point);
    Task<Response<Point>> Delete(int id);
}
