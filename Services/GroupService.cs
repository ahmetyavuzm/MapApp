using MapApp.Entities;
using MapApp.Interfaces;
using MapApp.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch.Internal;

namespace MapApp.Services;

public class GroupService:EntityService<Group, int>, IGroupService
{
    public GroupService(MapAppDbContext context) : base(context)
    {
    }

    public async Task<List<Group?>> GetUserLayers(string userId)
    {
        await this._context.Groups.ToArrayAsync();
        return await this._context.Groups.Include(g => g.Geometries).ThenInclude(g => (g as Group).Geometries).Where(g => g.UserId == userId && g.Type == "LAYER").ToListAsync();
    }

    public async Task<Group?> Update(int id, Group group)
    {
        Group? main_group = await this.GetById(id);
        if(main_group == null)
        {
            return null;
        }
        main_group.Properties = group.Properties;
        main_group.GroupId = group.GroupId;
        return await this.Update(main_group);

    }
}