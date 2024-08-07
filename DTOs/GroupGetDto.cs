
using MapApp.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace MapApp.DTOs;

public class GroupGetDto:BaseGeometryGetDto
{
    public List<BaseGeometryGetDto> Geometries { get; set; }

    public GroupGetDto()
    {
        Geometries = new List<BaseGeometryGetDto>();
    }

    public GroupGetDto(Group group)
    {
        Id = group.Id;
        UserId = group.UserId;
        Properties = group.Parse(group.Properties);
        GroupId = group.GroupId;
        Type = group.Type;
        Geometries = convert(group);
    }



    public List<BaseGeometryGetDto> convert (Group group)
    {
        List<BaseGeometryGetDto> geometries = new List<BaseGeometryGetDto>();
        if (group.Geometries == null)
        {
            return geometries;
        }
        foreach (var geometry in group.Geometries)
        {
            if (geometry is Geometry)
            {
                geometries.Add(new GeometryGetDto((Geometry)geometry));
            }
            else if (geometry is Group)
            {
                geometries.Add(new GroupGetDto((Group)geometry));
            }
        }
        return geometries;
    }

}
