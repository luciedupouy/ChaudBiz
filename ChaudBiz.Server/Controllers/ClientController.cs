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
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Clients.Add(client);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetItem), new { id = client.ClientId }, client);
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        var todo = await _context.Clients.FindAsync(id);

        if (todo == null)
            return NotFound();

        _context.Clients.Remove(todo);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}