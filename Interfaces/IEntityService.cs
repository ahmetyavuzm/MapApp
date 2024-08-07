using MapApp.Entities;
namespace MapApp.Interfaces;

public interface IEntityService<T, R> where T : class, IEntity
{
    Task<List<T>?> GetAll();
    Task<T?> GetById(R id);
    Task<T?> Create(T entity);
    Task<T?> Update(T entity);
    
    Task<T?> Delete(R id);

}
