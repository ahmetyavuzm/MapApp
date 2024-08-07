using Microsoft.AspNetCore.Mvc;

using MapApp.Models;
using MapApp.Interfaces;
using MapApp.Entities;
using MapApp.DTOs;

namespace MapApp.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<Response<User?>> GetUser(string id)
    {
        try{
            if (id == null)
            {
                return Response<User?>.Fail(null, "Id is null");
            }
            User? user = await _userService.GetById(id);

            if (user == null)
            {
                return Response<User?>.Fail(null, "User not found");
            }

            return Response<User?>.Success(user ,"User found successfully");
        }
        catch (Exception e)
        {
            return Response<User?>.Error(null, e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<Response<User?>> Create(UserRegisterDTO userRegisterDTO)
    {
        try
        {

            User? user = await _userService.Create(new User(userRegisterDTO));
            if (user == null)
            {
                return Response<User?>.Fail(null, "Failed to add user");
            }
            return Response<User?>.Success(user, "User added successfully");
        }
        catch (Exception e)
        {
            return Response<User?>.Error(null, e.Message);
        }

    }
}
