namespace MapApp;

public interface IPointService
{
    List<Point> GetAll();
    Point Get(int id);
    Point Add(PointBodyView point);
    Point Update(int id, PointBodyView point);
    Point Delete(int id);
}
