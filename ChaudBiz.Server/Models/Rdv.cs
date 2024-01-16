public class Rdv {
    public int IdRdv {get;set;}
    public DateTime DateRdv {get;set;}
    public string Lieu {get;set;}
    public string Description {get;set;}
    public Client Client {get;set;}
    public Administrateur Administrateur {get;set;}
}