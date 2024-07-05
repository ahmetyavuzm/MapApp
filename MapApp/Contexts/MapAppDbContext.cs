using Microsoft.EntityFrameworkCore;

namespace MapApp;

public class MapAppDbContext: DbContext
{
    public DbSet<Point> Points { get; set; }

    public MapAppDbContext(DbContextOptions<MapAppDbContext> options): base(options)
    {
    
    }
}
