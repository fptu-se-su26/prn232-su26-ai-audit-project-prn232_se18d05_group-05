using System.Linq.Expressions;

namespace Application;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<List<Category>> GetAllAsync(CancellationToken ct = default);
    Task<Category> AddAsync(Category entity);
    void Update(Category entity);
    Task<bool> AnyAsync(Expression<Func<Category, bool>> predicate, CancellationToken ct = default);
}
