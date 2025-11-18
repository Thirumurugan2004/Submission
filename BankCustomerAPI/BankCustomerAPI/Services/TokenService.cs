using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BankCustomerAPI.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly byte[] _keyBytes;

        public TokenService(IConfiguration config)
        {
            _config = config;
            _keyBytes = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key"));
        }

        // UPDATED: includes userId claim
        public string GenerateToken(string username, string role, long userId)
        {
            var key = new SymmetricSecurityKey(_keyBytes);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, username),
                new Claim(ClaimTypes.Role, role),
                new Claim("userId", userId.ToString()),   // <-- NEW CLAIM
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpireMinutes"] ?? "15")),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshTokenString(int size = 64)
        {
            var random = new byte[size];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(random);
            return Convert.ToBase64String(random);
        }

        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(_keyBytes),
                ValidateLifetime = false
            };

            var handler = new JwtSecurityTokenHandler();
            try
            {
                return handler.ValidateToken(token, tokenValidationParams, out _);
            }
            catch
            {
                return null;
            }
        }
    }
}
