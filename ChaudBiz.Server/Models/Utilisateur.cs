public enum Role
{
    ADMINISTRATEUR,
    OUVRIER
}
public class Utilisateur
{
    public int UtilisateurId { get; set; }
    public string NomUtilisateur { get; set; }
    public string PrenomUtilisateur { get; set; }
    public string MailUtilisateur { get; set; }
    public string Mdp { get; set; }
    public Role Role {get;set;}
}