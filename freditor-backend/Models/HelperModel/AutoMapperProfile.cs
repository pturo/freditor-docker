using AutoMapper;
using FreditorBackend.Models.UserModel;

namespace FreditorBackend.Models.HelperModel
{
    /// <summary>
    /// Class <c>AutoMapperProfile</c> maps different objects.
    /// </summary>
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // If you type password, be sure it's at least 8 characters, otherwise you won't register (4, 8, 12, 16, 20, etc.).
            CreateMap<string, byte[]>().ConvertUsing(s => System.Convert.FromBase64String(s));
            CreateMap<byte[], string>().ConvertUsing(bytes => System.Convert.ToBase64String(bytes));
            CreateMap<Login, UserDto>();
            CreateMap<Signup, UserDto>();
        }
    }
}
