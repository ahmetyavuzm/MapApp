using Microsoft.EntityFrameworkCore;
using MapApp.Entities;
using System.ComponentModel;
using System.Drawing;
namespace MapApp.Contexts;

public class MapAppDbContext: DbContext
{

    public DbSet<User> Users { get; set; }

    public DbSet<BaseGeometry> BaseGeometries { get; set; }

    public DbSet<Geometry> Geometries { get; set; }
    public DbSet<Group> Groups { get; set; }
    public MapAppDbContext(DbContextOptions<MapAppDbContext> options): base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<BaseGeometry>().UseTpcMappingStrategy();
        modelBuilder.Entity<Geometry>().ToTable("Geometries");
        modelBuilder.Entity<Group>().ToTable("Groups");
        modelBuilder.Entity<User>().ToTable("Users");

        modelBuilder.Entity<User>().HasMany(u => u.Layers).WithOne(l => l.User).HasForeignKey(l => l.UserId);
        modelBuilder.Entity<Geometry>().HasOne(g => g.Group).WithMany().HasForeignKey(g => g.GroupId);
        modelBuilder.Entity<Group>().HasMany(g => g.Geometries).WithOne(g=>g.Group).HasForeignKey(g => g.GroupId);
        //modelBuilder.Entity<PointEntity>().HasOne(p=>p.Parent).WithMany()

        modelBuilder.Entity<User>().Navigation(u => u.Layers).AutoInclude();
        modelBuilder.Entity<Group>().Navigation(g => g.Geometries).AutoInclude(false);
    } 
}
