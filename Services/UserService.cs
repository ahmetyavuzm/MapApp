using MapApp.Entities;
using MapApp.DTOs;
using MapApp.Contexts;
using MapApp.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;

namespace MapApp.Services;


public class UserService: EntityService<User,string>, IUserService
{

    public UserService(MapAppDbContext context): base(context)
    {
    }

    public new async Task<User?> Update(User entity)
    {
        User? user = await this.GetById(entity.Id);
        if (user == null) return null;
        user.Layers = entity.Layers;
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }
}   