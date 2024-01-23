// AuthController.cs
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<Utilisateur> _userManager;
    private readonly SignInManager<Utilisateur> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<Utilisateur> userManager, SignInManager<Utilisateur> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] Utilisateur model, string password)
{
    var user = new Utilisateur
    {
        NomUtilisateur = model.NomUtilisateur,
        PrenomUtilisateur = model.PrenomUtilisateur,
        MailUtilisateur = model.MailUtilisateur,
        Role = model.Role
    };

    var result = await _userManager.CreateAsync(user, password);

    if (result.Succeeded)
    {
        return Ok(new { Message = "Inscription réussie." });
    }

    return BadRequest(new { Message = "Erreur lors de l'inscription.", Errors = result.Errors });
}

    [HttpPost("login")]
    [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] Utilisateur model, string password)
{
    var user = await _userManager.FindByNameAsync(model.NomUtilisateur);

    if (user != null && await _userManager.CheckPasswordAsync(user, password))
    {
        await _signInManager.SignInAsync(user, isPersistent: false);

        var token = GenerateJwtToken(user);

        return Ok(new { Token = token });
    }

    return Unauthorized(new { Message = "Identifiant ou mot de passe incorrect." });
}

    private string GenerateJwtToken(Utilisateur user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UtilisateurId.ToString()),
            new Claim(ClaimTypes.Name, user.NomUtilisateur),
            new Claim(ClaimTypes.Role, user.Role.ToString())
            // Ajoutez d'autres revendications au besoin
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Issuer"],
            claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
