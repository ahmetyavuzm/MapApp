namespace MapApp;

public interface IPointController
{
    Response<List<Point>> GetAll();
    Response<Point> Get(int id);
    Response<Point> Add(PointBodyView point);
    Response<Point> Update(int id, PointBodyView point);
    Response<Point> Delete(int id);
}
