using Domain;
using Mapster;

namespace Application;

public class AdminMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<SupplierProfile, SupplierDetailResponse>()
            .Map(dest => dest.SupplierId, src => src.Id)
            .Map(dest => dest.Address, src => src.Address)
            .Map(dest => dest.RejectedReason, src => src.RejectedReason)
            .Map(dest => dest.ApprovedAt, src => src.ApprovedAt)
            .Ignore(dest => dest.ApprovedByName); // set manually after Include

        config.NewConfig<SupplierProfile, SupplierListResponse>()
            .Map(dest => dest.SupplierId, src => src.Id);
    }
}
