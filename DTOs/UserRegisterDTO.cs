

using MapApp.Interfaces;
using MapApp.Entities;

namespace MapApp.DTOs;

public class UserRegisterDTO: IDTO<User>
{
    public string Id { get; set; }


    public UserRegisterDTO(string Id)
    {
        this.Id = Id;
    }
}