
using MapApp.DTOs;
using System.Text.Json;

namespace MapApp.Entities;

public class Group: BaseGeometry
{
    public List<BaseGeometry> Geometries { get; set; }

    public User User { get; set; }

    public Group()
    {
    }

    public Group(GroupSetDto dto){
        Id=0;
        Type = dto.Type.ToUpper();
        GroupId = dto.GroupId;
        UserId = dto.UserId;
        Properties = this.Stringify(dto.Properties);
    }


}