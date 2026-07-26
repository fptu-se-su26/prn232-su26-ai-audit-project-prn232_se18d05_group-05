namespace Application;

public interface IAddressService
{
    Task<List<AddressResponse>> GetAddressesAsync(Guid userId, CancellationToken ct = default);
    Task<List<DistrictResponse>> GetDistrictsAsync(CancellationToken ct = default);
    Task<AddressResponse> CreateAddressAsync(Guid userId, CreateAddressRequest request, CancellationToken ct = default);
    Task<AddressResponse> UpdateAddressAsync(Guid userId, Guid id, UpdateAddressRequest request, CancellationToken ct = default);
    Task<AddressResponse> SetDefaultAddressAsync(Guid userId, Guid id, CancellationToken ct = default);
    Task DeleteAddressAsync(Guid userId, Guid id, CancellationToken ct = default);
}
