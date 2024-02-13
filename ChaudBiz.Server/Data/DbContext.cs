using Microsoft.EntityFrameworkCore;
public class ChaudBizContext : DbContext
{
    public DbSet<Chantier> Chantiers { get; set; } = null!;
    public DbSet<Client> Clients { get; set; } = null!;
    public DbSet<Document> Documents { get; set; } = null!;
    public DbSet<Materiel> Materiels { get; set; } = null!;
    public DbSet<Rdv> Rdvs { get; set; } = null!;
    public DbSet<Utilisateur> Utilisateurs { get; set; } = null!;
    public DbSet<MaterielChantier> MaterielChantiers {get;set;}=null!;

    public string DbPath { get; private set; }
    public ChaudBizContext()
    {
        // Path to SQLite database file
        DbPath = "ChaudBizTodo.db";
    }
    // The following configures EF to create a SQLite database file locally
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // Use SQLite as database
        options.UseSqlite($"Data Source={DbPath}");
        // Optional: log SQL queries to console
        //options.LogTo(Console.WriteLine, new[] {
        //DbLoggerCategory.Database.Command.Name }, LogLevel.Information);
    }
}