using MapApp.DTOs;

namespace MapApp.Entities;

public class Geometry:BaseGeometry
{    
    public string Wkt {get;set;}


    public Geometry()
    {
        
    }

    public Geometry(GeometrySetDto dto)
    {
        Id = 0;
        Type = dto.Type.ToUpper();
        GroupId = dto.GroupId;
        UserId = dto.UserId;
        Wkt = dto.Wkt;
        Properties = this.Stringify(dto.Properties);
    }
}