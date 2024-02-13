public enum Statut
{
    EN_ATTENTE,
    EN_COURS,
    TERMINE
}
public enum TypeChantier {
    CLIMATISATION, 
    POMPE,
    CHAUDIERE
}
public class Chantier
{
    public int ChantierId { get; set; }
    public TypeChantier Type { get; set; }
    public string Description { get; set; }
    public DateTime DateDebut { get; set; }
    public DateTime DateFin { get; set; }
    public Statut Statut { get; set; }
    public string Adresse { get; set; }
    public Client Client { get; set; }
}