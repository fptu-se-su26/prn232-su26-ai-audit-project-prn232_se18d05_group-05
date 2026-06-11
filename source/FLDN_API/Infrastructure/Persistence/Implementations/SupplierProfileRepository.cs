using Application;

namespace Infrastructure;

[RegisterService(typeof(ISupplierProfileRepository))]
public sealed class SupplierProfileRepository(ApplicationDbContext db) : GenericRepository<SupplierProfile>(db), ISupplierProfileRepository
{
}
