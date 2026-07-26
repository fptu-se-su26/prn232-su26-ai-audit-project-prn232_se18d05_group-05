namespace Domain;

public sealed class CreateAddressRequest
{
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
    public Guid DistrictId { get; set; }
    public bool IsDefault { get; set; }
}

public sealed class UpdateAddressRequest
{
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
    public Guid DistrictId { get; set; }
    public bool IsDefault { get; set; }
}

public sealed class AddressResponse
{
    public Guid AddressId { get; set; }
    public string ReceiverName { get; set; } = default!;
    public string ReceiverPhone { get; set; } = default!;
    public string FullAddress { get; set; } = default!;
    public Guid DistrictId { get; set; }
    public string DistrictName { get; set; } = default!;
    public bool IsDefault { get; set; }
}
