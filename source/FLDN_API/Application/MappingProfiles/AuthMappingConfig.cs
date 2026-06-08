using Domain;
using Mapster;

namespace Application;

public class AuthMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<User, RegisterResponse>();
    }
}
