using MapApp.Entities;

namespace MapApp.DTOs;

public class GeometryGetDto:BaseGeometryGetDto
{
    public string Wkt {get;set;}
    public GeometryGetDto()
    {
        
    }

    public GeometryGetDto(Geometry geometry)
    {
        Id = geometry.Id;
        GroupId = geometry.GroupId;
        UserId = geometry.UserId;
        Type = geometry.Type;
        Wkt = geometry.Wkt;
        Properties = geometry.Parse(geometry.Properties);
    }
}
