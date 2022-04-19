using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FreditorBackend.Models.UserModel;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FreditorBackend.Repository.AuthRepository;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace FreditorBackend.Controllers
{
    /// <summary>
    /// Class <c>AuthController</c> determines if user can register successfully and login.
    /// </summary>
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _irepo;
        private readonly IConfiguration _iconfig;
        private readonly IMapper _imapper;

        public AuthController(IAuthRepository irepo, IConfiguration iconfig, IMapper imapper)
        {
            _imapper = imapper;
            _iconfig = iconfig;
            _irepo = irepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Register register)
        {
            if(await _irepo.IsUserExist(register.UserName))
            {
                return BadRequest("UserName already exists!");
            }

            register.Email = register.Email.ToLower();
            if(await _irepo.IsUserExist(register.Email))
            {
                return BadRequest("Email already exists");
            }

            var userToCreate = _imapper.Map<UserDto>(register);
            var createdUser = await _irepo.Register(userToCreate, register.Password);
            return StatusCode(201, new { username = createdUser.UserName });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
            var userFromRepo = await _irepo.Login(login.UserName, login.Password);
            if(userFromRepo == null)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.UserId.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("IHeardItThrough0"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(15),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), username = userFromRepo.UserName, email = userFromRepo.Email });
        }
    }
}
