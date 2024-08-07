using MapApp.Entities;

namespace MapApp.DTOs;

public class BaseGeometryGetDto
{
    public int? GroupId {get;set;}
    public int Id { get; set;}
    public object Properties {get;set;}

    public string Type {get;set;}

    public string UserId {get;set;}


    public BaseGeometryGetDto()
    {
        
    }

    public BaseGeometryGetDto(BaseGeometry geometry)
    {
        Id = geometry.Id;
        GroupId = geometry.GroupId;
        UserId = geometry.UserId;
        Type = geometry.Type;
        Properties = geometry.Parse(geometry.Properties);
    }
}
