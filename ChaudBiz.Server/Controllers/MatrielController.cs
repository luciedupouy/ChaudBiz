using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/materiel")]
public class MaterielController : ControllerBase
{
    private readonly ChaudBizContext _context;

    public MaterielController(ChaudBizContext context)
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
    [HttpGet("by-etat/{etat}")]
    public async Task<ActionResult<IEnumerable<Materiel>>> GetItemsByStatus(EtatMateriel etat)
    {
        var items = await _context.Materiels
            .Where(c => c.Etat == etat)
            .ToListAsync();

        return items;
    }
}