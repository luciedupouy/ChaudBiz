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
    DateTime currentDate = DateTime.Now.Date;

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
    [HttpGet("by-date/{date}")]
    public async Task<ActionResult<IEnumerable<Chantier>>> GetItemsDate(DateTime date)
    {
        var items = await _context.Chantiers
            .Where(c => c.DateDebut.Date <= date && c.DateFin.Date >= date)
            .ToListAsync();
        return items;
    }


    [HttpPost]
    public async Task<ActionResult<Chantier>> CreateChantier(Chantier chantier)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Chantiers.Add(chantier);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItem), new { id = chantier.ChantierId }, chantier);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        var todo = await _context.Chantiers.FindAsync(id);

        if (todo == null)
            return NotFound();

        _context.Chantiers.Remove(todo);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}