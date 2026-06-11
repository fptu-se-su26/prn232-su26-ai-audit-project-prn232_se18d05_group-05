using Application;

namespace Infrastructure;

[RegisterService(typeof(IVoucherRepository))]
public sealed class VoucherRepository(ApplicationDbContext db) : GenericRepository<Voucher>(db), IVoucherRepository
{
}
