using System.Linq.Expressions;

namespace Infrastructure;

[RegisterService(typeof(ICategoryRepository))]
public sealed class CategoryRepository(ApplicationDbContext db) : ICategoryRepository
{
    private readonly DbSet<Category> _dbSet = db.Set<Category>();

    public async Task<Category?> GetByIdAsync(Guid id, CancellationToken ct = default)
        => await _dbSet.FirstOrDefaultAsync(c => c.CategoryId == id, ct);

    public async Task<List<Category>> GetAllAsync(CancellationToken ct = default)
        => await _dbSet.Include(c => c.SubCategories).Where(c => !c.IsDeleted).ToListAsync(ct);

    public async Task<Category> AddAsync(Category entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public void Update(Category entity) => _dbSet.Update(entity);

    public async Task<bool> AnyAsync(Expression<Func<Category, bool>> predicate, CancellationToken ct = default)
        => await _dbSet.AnyAsync(predicate, ct);
}
