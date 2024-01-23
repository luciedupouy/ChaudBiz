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

    // GET: api/student
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Utilisateur>>> GetItems()
    {
        // Get items
        var items = _context.Utilisateurs;
        return await items.ToListAsync();
    }
    // GET: api/todo/2
    [HttpGet("{id}")]
    public async Task<ActionResult<Utilisateur>> GetItem(int id)
    {
        // Find a specific item
        // SingleAsync() throws an exception if no item is found (which is possible, depending on id)
        // SingleOrDefaultAsync() is a safer choice here
        var item = await _context.Utilisateurs.SingleOrDefaultAsync(t => t.UtilisateurId == id);


        if (item == null)
            return NotFound();


        return item;

    }

    [HttpPost("inscription")]
    public async Task<ActionResult<Utilisateur>> Inscription(Utilisateur item)
    {
        // Vérifiez si l'utilisateur existe déjà
        if (_context.Utilisateurs.Any(u => u.MailUtilisateur == item.MailUtilisateur))
        {
            return Conflict(new { Message = "L'utilisateur avec cet e-mail existe déjà." });
        }

        // Hasher le mot de passe avant de l'enregistrer
        item.Mdp = BCrypt.Net.BCrypt.HashPassword(item.Mdp);

        // Ajouter l'utilisateur à votre DbContext et sauvegarder les modifications
        _context.Utilisateurs.Add(item);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItem), new { id = item.UtilisateurId }, item);
    }
    
[HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Utilisateur model)
    {
        var user = await _context.Utilisateurs.SingleOrDefaultAsync(u => u.MailUtilisateur == model.MailUtilisateur);

        if (user != null && BCrypt.Net.BCrypt.Verify(model.Mdp, user.Mdp))
        {
            // Logique de connexion réussie ici
            // ...

            return Ok(new { Message = "Connexion réussie." });
        }

        return Unauthorized(new { Message = "Identifiant ou mot de passe incorrect." });
    }


}