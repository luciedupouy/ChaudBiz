using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/client")]
public class ClientController : ControllerBase
{
    private readonly ChaudBizContext _context;

    public ClientController(ChaudBizContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetItems()
    {
        var items = _context.Clients;
        return await items.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetItem(int id)
    {

        var item = await _context.Clients.SingleOrDefaultAsync(t => t.ClientId == id);


        if (item == null)
            return NotFound();


        return item;

    }

    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient(Client client)
    {
        // Check if the chantier object is valid
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Add the new chantier to the context
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        // Return the created chantier
        return CreatedAtAction(nameof(GetItem), new { id = client.ClientId }, client);
    }
}