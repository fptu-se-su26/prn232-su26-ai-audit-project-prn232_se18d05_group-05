namespace Infrastructure;

[RegisterService(typeof(IUserRepository))]
public sealed class UserRepository(ApplicationDbContext db) : GenericRepository<User>(db), IUserRepository
{
}
