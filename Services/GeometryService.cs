using MapApp.Entities;
using MapApp.Interfaces;
using MapApp.Contexts;
using System.Drawing;
using Microsoft.EntityFrameworkCore;

namespace MapApp.Services;

public class GeometryService: EntityService<Geometry, int>, IGeometryService
{
    public GeometryService(MapAppDbContext context) : base(context)
    {
    }

    public Task<List<Geometry>> GetUserGeometries(string userId)
    {
        return this._context.Geometries.Where(g => g.UserId == userId).ToListAsync();
    }

    public async Task<Geometry?> Update(int id, Geometry geometry)
    {
        Geometry? main_geometry = await this.GetById(id);
        if(main_geometry == null)
        {
            return null;
        }
        main_geometry.Properties = geometry.Properties;
        main_geometry.Type = geometry.Type;
        main_geometry.UserId = geometry.UserId;
        main_geometry.Wkt = geometry.Wkt;
        main_geometry.GroupId = geometry.GroupId;

        return await this.Update(main_geometry);
    }
}