namespace Domain;

public class Batch : EntityBase<Guid>
{
    public Guid ProductId { get; set; }
    public string BatchCode { get; set; } = default!;
    public decimal Quantity { get; set; }
    public decimal RemainingQty { get; set; }
    public DateOnly? HarvestDate { get; set; }
    public DateOnly? ManufacturingDate { get; set; }
    public DateOnly? PackagingDate { get; set; }
    public DateOnly ExpiryDate { get; set; }
    public string? GrowingRegion { get; set; }
    public CertificateType? CertificateType { get; set; }
    public string? CertificateUrl { get; set; }
    public BatchStatus Status { get; set; }

    // Navigation
    public Product Product { get; set; } = default!;
    public QRCode? QRCode { get; set; }
}
