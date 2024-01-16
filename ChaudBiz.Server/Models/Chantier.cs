public enum Statut {
    EN_ATTENTE,
    EN_COURS, 
    TERMINE
}
public class Chantier {
    public int IdChantier {get;set;}
    public string NomChantier {get;set;}
    public string Description {get;set;}
    public DateTime DateDebut {get;set;}
    public DateTime DateFin {get;set;}
    public Statut Statut {get;set;}
}