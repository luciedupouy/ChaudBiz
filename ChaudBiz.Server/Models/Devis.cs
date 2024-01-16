using System.Security.Cryptography.X509Certificates;

public enum Etat {
    EN_ATTENTE,
    EN_COURS,
    ENVOYE 
}
public class Devis {
    public int IdDevis {get;set;}
    public int MontantDevis {get;set;}
    public DateTime DateDevis {get;set;}
    public Etat EtatDevis {get;set;}
    public Client Client {get;set;}
}