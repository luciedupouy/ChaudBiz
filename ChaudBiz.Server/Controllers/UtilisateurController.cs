using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/utilisateur")]
public class UtilisateurController : ControllerBase
{
    private readonly ChaudBizContext _context;

    public UtilisateurController(ChaudBizContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Utilisateur>>> GetItems()
    {
        var items = _context.Utilisateurs;
        return await items.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Utilisateur>> GetItem(int id)
    {
        
        var item = await _context.Utilisateurs.SingleOrDefaultAsync(t => t.UtilisateurId == id);


        if (item == null)
            return NotFound();


        return item;

    }

   [HttpPost("inscription")]
public async Task<ActionResult<Utilisateur>> Inscription(Utilisateur item)
{
    if (_context.Utilisateurs.Any(u => u.MailUtilisateur == item.MailUtilisateur))
    {
        return Conflict(new { Message = "L'utilisateur avec cet e-mail existe déjà." });
    }

    if (item.Role != "ADMINISTRATEUR" && item.Role != "OUVRIER")
    {
        return BadRequest(new { Message = "Le rôle spécifié n'est pas valide." });
    }

    item.Mdp = BCrypt.Net.BCrypt.HashPassword(item.Mdp);

    _context.Utilisateurs.Add(item);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetItem), new { id = item.UtilisateurId }, item);
}


    
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] UtilisateurDto loginDto)
{
    var user = await _context.Utilisateurs.SingleOrDefaultAsync(u => u.MailUtilisateur == loginDto.MailUtilisateur);

    if (user != null && BCrypt.Net.BCrypt.Verify(loginDto.Mdp, user.Mdp))
    {
         var userRole = user.Role;
         Console.WriteLine("Rôle de l'utilisateur:", userRole); 


    return Ok(new { Message = "Connexion réussie.", Role = userRole });
    }

    return Unauthorized(new { Message = "Identifiant ou mot de passe incorrect." });
}




}