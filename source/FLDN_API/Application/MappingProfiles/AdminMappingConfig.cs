using Domain;
using Mapster;

namespace Application;

public class AdminMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<SupplierProfile, SupplierDetailResponse>()
            .Map(dest => dest.SupplierId, src => src.Id);

        config.NewConfig<SupplierProfile, SupplierListResponse>()
            .Map(dest => dest.SupplierId, src => src.Id);
    }
}
