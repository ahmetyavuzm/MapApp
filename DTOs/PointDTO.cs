using MapApp.Entities;

namespace MapApp.DTOs;

public class PointDTO : IDTO<Point>
{
    public string Name { get; set; }
    public double X { get; set; }
    public double Y { get; set; }


    public PointDTO(string name, double x, double y)
    {
        Name = name;
        X = x;
        Y = y;
    }


    public PointDTO(Point point)
    {
        Name = point.Name;
        X = point.X;
        Y = point.Y;
    }

    public PointDTO()
    {
        
    }

}
