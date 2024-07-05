using Microsoft.OpenApi.Any;

namespace MapApp;

public class PointBodyView : IView<Point>
{
    public string Name { get; set; }
    public double X { get; set; }
    public double Y { get; set; }


    public PointBodyView(string name, double x, double y)
    {
        Name = name;
        X = x;
        Y = y;
    }


    public PointBodyView(Point point)
    {
        Name = point.Name;
        X = point.X;
        Y = point.Y;
    }

    public PointBodyView()
    {
        
    }

}
