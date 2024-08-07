
using MapApp.DTOs;
using MapApp.Interfaces;

namespace MapApp.Entities;

public class User:IEntity
{
    public string Id { get; set; }


    public List<Group> Layers { get; set; }

    public User(UserRegisterDTO userRegisterDTO)
    {
        Id = userRegisterDTO.Id;
    }

    public User(string id)
    {
        Id = id;
    }

    public User()
    {
        
    }
}