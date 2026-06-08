namespace Domain;

public class QRCode : EntityBase<int>
{
    public int BatchId { get; set; }
    public string QRCodeData { get; set; } = default!;
    public string QRCodeUrl { get; set; } = default!;
    public int ScanCount { get; set; }

    // Navigation
    public Batch Batch { get; set; } = default!;
}
