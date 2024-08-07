
using MapApp.Interfaces;
using MapApp.Contexts;
using Microsoft.EntityFrameworkCore;

using MapApp.Entities;

namespace MapApp.Services;

public class EntityService<T, R> : IEntityService<T, R> where T : class, IEntity
{


    protected readonly MapAppDbContext _context;

    public EntityService(MapAppDbContext context)
    {
        _context = context;
    }
    public async Task<T?> Create(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<T?> Delete(R id)
    {
        T? entity = await GetById(id);
        if (entity is null){return null;};
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<T>?> GetAll()
    {

        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T?> GetById(R id)
    {
        //var layers = await _context.Layers.ToListAsync();
        //var users = await _context.Users.ToListAsync();
        //var groups = await _context.Groups.ToListAsync();
        //var geometries = await _context.Geometries.ToListAsync();
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T?> Update(T entity)
    {
        this._context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();
        return entity;
    }
}
