using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/rdv")]
public class RdvController : ControllerBase
{
    private readonly ChaudBizContext _context;

    public RdvController(ChaudBizContext context)
    {
        _context = context;
    }

    // GET: api/student
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Rdv>>> GetItems()
    {
        // Get items
        var items = _context.Rdvs;
        return await items.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Rdv>> GetItem(int id)
    {
        
        var item = await _context.Rdvs.SingleOrDefaultAsync(t => t.RdvId == id);


        if (item == null)
            return NotFound();


        return item;

    }
    [HttpGet("by-date")]
    public async Task<ActionResult<IEnumerable<Rdv>>> GetItemsByDate()
    {
        // Obtenez la date actuelle
        DateTime currentDate = DateTime.Now.Date;

        // Récupérez les rendez-vous de la date actuelle
        var items = await _context.Rdvs
            .Where(r => r.DateRdv.Date == currentDate)
            .ToListAsync();

        return items;
    }

    [HttpPost]
public async Task<ActionResult<Rdv>> CreateRdv(RdvDto rdvCreateDto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // Vérifiez si l'utilisateur et le client existent dans la base de données
    var utilisateur = await _context.Utilisateurs.FindAsync(rdvCreateDto.UtilisateurId);
    var client = await _context.Clients.FindAsync(rdvCreateDto.ClientId);

    if (utilisateur == null || client == null)
    {
        return NotFound("Utilisateur ou client non trouvé.");
    }

    var rdv = new Rdv
    {
        Lieu = rdvCreateDto.Lieu,
        Description = rdvCreateDto.Description,
        DateRdv = rdvCreateDto.DateRdv,
        Utilisateur = utilisateur,
        Client = client
    };

    _context.Rdvs.Add(rdv);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetItem), new { id = rdv.RdvId }, rdv);
}

}