using Microsoft.EntityFrameworkCore;
using MapApp.Entities;
namespace MapApp.Contexts;

public class MapAppDbContext: DbContext
{
    public DbSet<Point> Points { get; set; }

    public MapAppDbContext(DbContextOptions<MapAppDbContext> options): base(options)
    {
    
    }
}
