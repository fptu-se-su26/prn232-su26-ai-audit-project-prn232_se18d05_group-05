using Domain;

namespace Contract;

public class LogisticsListRequest : PagedRequest
{
    public LogisticsOperatorStatus? Status { get; set; }
}
