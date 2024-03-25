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
        DbPath = "ChaudBizTodo.db";
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DbPath}");
        
    }
}