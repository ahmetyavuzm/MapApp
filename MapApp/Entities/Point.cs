namespace MapApp;

public class Point:IEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public double X { get; set; }
    public double Y { get; set; }

    public Point(int id, string name, double x, double y)
    {
        Id = id;
        Name = name;
        X = x;
        Y = y;
    }
    public Point()
    {
        
    }

    public Point(int id, PointBodyView body)
    {
        Id = id;
        Name = body.Name;
        X = body.X;
        Y = body.Y;
    }
}
