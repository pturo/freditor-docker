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

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(Signup signup)
        {
            if(await _irepo.IsUserExist(signup.UserName))
            {
                return BadRequest("UserName already exists!");
            }

            signup.Email = signup.Email.ToLower();
            if(await _irepo.IsUserExist(signup.Email))
            {
                return BadRequest("Email already exists");
            }

            var userToCreate = _imapper.Map<UserDto>(signup);
            var createdUser = await _irepo.Signup(userToCreate, signup.Password);
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
                new Claim(ClaimTypes.Name, userFromRepo.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, "https://localhost:44335"),
                new Claim(JwtRegisteredClaimNames.Iss, "https://localhost:44335")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("IHeardItThrough0"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new JwtSecurityToken(
                issuer: "https://localhost:44335",
                audience: "https://localhost:44335",
                claims: claims,
                expires: DateTime.Now.AddMinutes(240),
                signingCredentials: creds
                );

            var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

            return StatusCode(201, new { username = login.UserName, token = token });
        }
    }
}
