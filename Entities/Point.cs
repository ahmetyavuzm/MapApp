
using MapApp.Interfaces;
using MapApp.DTOs;

namespace MapApp.Entities;

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

    public Point(int id, PointDTO dto)
    {
        Id = id;
        Name = dto.Name;
        X = dto.X;
        Y = dto.Y;
    }
}
