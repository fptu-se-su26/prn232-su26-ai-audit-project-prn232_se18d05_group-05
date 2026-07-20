namespace Infrastructure;

public static class UnitOfWorkExtensions
{
    public static async Task EnsureSaveAsync(this IUnitOfWork unitOfWork, CancellationToken ct = default)
    {
        var rows = await unitOfWork.SaveChangesAsync(ct);
        if (rows <= 0)
            throw new DatabaseOperationException(ExceptionMessages.DatabaseOperationFailed);
    }
}
