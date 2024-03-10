using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/chantier")]
public class ChantierController : ControllerBase
{
    private readonly ChaudBizContext _context;

    public ChantierController(ChaudBizContext context)
    {
        _context = context;
    }

    [HttpGet]
public async Task<ActionResult<IEnumerable<Chantier>>> GetItems()
{
    // Get the current date
    DateTime currentDate = DateTime.Now.Date;

    // Filter chantiers based on the current date
    var items = await _context.Chantiers
        .Where(c => c.DateDebut.Date <= currentDate && c.DateFin.Date >= currentDate)
        .ToListAsync();

    return items;
}
    [HttpGet("upcoming")]
public async Task<ActionResult<IEnumerable<Chantier>>> GetUpcomingItems()
{
    var today = DateTime.Today;
    var upcomingItems = await _context.Chantiers
        .Where(c => c.DateDebut.Date >= today)
        .ToListAsync();

    return upcomingItems;
}

    [HttpGet("{id}")]
    public async Task<ActionResult<Chantier>> GetItem(int id)
    {
        // Find a specific item
        // SingleAsync() throws an exception if no item is found (which is possible, depending on id)
        // SingleOrDefaultAsync() is a safer choice here
        var item = await _context.Chantiers.SingleOrDefaultAsync(t => t.ChantierId == id);


        if (item == null)
            return NotFound();


        return item;

    }
    [HttpGet("by-status/{status}")]
    public async Task<ActionResult<IEnumerable<Chantier>>> GetItemsByStatus(Statut status)
    {
        var items = await _context.Chantiers
            .Where(c => c.Statut == status)
            .ToListAsync();

        return items;
    }


    [HttpPost]
    public async Task<ActionResult<Chantier>> CreateChantier(Chantier chantier)
    {
        // Check if the chantier object is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Add the new chantier to the context
        _context.Chantiers.Add(chantier);
        await _context.SaveChangesAsync();

        // Return the created chantier
        return CreatedAtAction(nameof(GetItem), new { id = chantier.ChantierId }, chantier);
    }
}