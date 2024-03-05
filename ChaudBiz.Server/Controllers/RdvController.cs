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
    public async Task<ActionResult<IEnumerable<Materiel>>> GetItems()
    {
        // Get items
        var items = _context.Materiels;
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
    public async Task<ActionResult<Rdv>> CreateRdv(Rdv rdv)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Rdvs.Add(rdv);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItem), new { id = rdv.RdvId }, rdv);
    }
}