namespace Application;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> Repository<T>() where T : EntityBase<Guid>;

    IUserRepository Users { get; }
    ICategoryRepository Categories { get; }
    ISupplierProfileRepository SupplierProfiles { get; }

    Task<int> SaveChangesAsync(CancellationToken ct = default);
    Task BeginTransactionAsync(CancellationToken ct = default);
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync(CancellationToken ct = default);
}
