
using MapApp.Entities;

namespace MapApp.Interfaces;

public interface IGroupService: IEntityService<Group, int>
{
    Task<Group?> Update(int id, Group group);

    Task<List<Group?>> GetUserLayers(string userId);
}
