
using System.Data;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MapApp;

public class PointService : IPointService
{
    private readonly string table_name;

    private readonly MapAppDbContext _context;
    public PointService(MapAppDbContext context)
    {
        this.table_name = "public.Points";
        this._context = context;
    
    }

public async Task<Point?> Add(PointBodyView view)
    {
        var point = new Point(0, view.Name, view.X, view.Y);
        _context.Points.Add(point);
        await _context.SaveChangesAsync();
        return point;
    }

    public async Task<Point?> Update(int id, PointBodyView view)
    {
        var point = await _context.Points.FindAsync(id);
        if (point == null) return null;

        point.Name = view.Name;
        point.X = view.X;
        point.Y = view.Y;
        _context.Points.Update(point);
        await _context.SaveChangesAsync();
        return point;
    }

    public async Task<Point?> Delete(int id)
    {
        var point = await _context.Points.FindAsync(id);
        if (point == null) return null;

        _context.Points.Remove(point);
        await _context.SaveChangesAsync();
        return point;
    }

    public async Task<List<Point>?> GetAll()
    {
        return await _context.Points.ToListAsync();
    }

    public async Task<Point?> GetById(int id)
    {
        return await _context.Points.FindAsync(id);
    }
}
