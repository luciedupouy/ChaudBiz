using System.Security.Cryptography.X509Certificates;

public enum Etat {
    EN_ATTENTE,
    EN_COURS,
    ENVOYE 
}
public enum Type {
    FACTURE, 
    DEVIS
}
public class Document {
    public int DocumentId {get;set;}
    public int MontantDocument {get;set;}
    public DateTime DateDocument {get;set;}
    public Etat EtatDocument {get;set;}
    public Client Client {get;set;}
    public Type Type {get;set;}
}