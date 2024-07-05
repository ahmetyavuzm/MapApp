
namespace MapApp;

public class PointService : IPointService
{
    private static readonly List<Point> points = CreateData();
    private static int id_counter = points.Count + 1;
    public Point Add(PointBodyView point_body)
    {
        
        var item = new Point(id_counter,point_body);
        points.Add(item);
        id_counter++;

        return item;
    }


    public Point Get(int id)
    {
        return points.FirstOrDefault(p => p.Id == id);
    }

    public List<Point> GetAll()
    {
        return points;
    }

    public Point Update(int id, PointBodyView point_body)
    {
        var item = points.FirstOrDefault(p => p.Id == id);
        if (item == null)
        {
            return null;
        }
        item.Name = point_body.Name;
        item.X = point_body.X;
        item.Y = point_body.Y;
        return item;
    }

    public Point Delete(int id)
    {
        Point point = points.FirstOrDefault(p => p.Id == id);
        if (point == null)
        {
            return null;
        }
        points.Remove(point);
        return point;
    }


    private static List<Point> CreateData()
    {
        return new List<Point>{
            new Point(1, "Istanbul", 18, 33),
            new Point(2, "Ankara", 15, 7),
            new Point(3, "Izmir", 89, 81),
            new Point(4, "Bursa", 63, 84),
            new Point(5, "Antalya", 53, 61),
            new Point(6, "Adana", 55, 16),
            new Point(7, "Konya", 9, 4),
            new Point(8, "Gaziantep", 8, 89),
            new Point(9, "Şanlıurfa", 79, 66),
            new Point(10, "Kocaeli", 51, 81),
            new Point(11, "Diyarbakır", 37, 98),
            new Point(12, "Mersin", 4, 2),
            new Point(13, "Kayseri", 52, 82),
            new Point(14, "Samsun", 61, 94),
            new Point(15, "Eskişehir", 97, 82),
            new Point(16, "Denizli", 31, 84),
            new Point(17, "Trabzon", 2, 29),
            new Point(18, "Malatya", 89, 55),
            new Point(19, "Manisa", 58, 58),
            new Point(20, "Kahramanmaraş", 83, 63)
        };
    }
}
