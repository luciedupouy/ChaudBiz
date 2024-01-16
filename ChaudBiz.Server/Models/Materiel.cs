public enum EtatMateriel {
    DISPONIBLE, 
    A_COMMANDER,
    INDISPONIBLE
}
public class Materiel {
    public int MaterielId {get;set;}
    public string Label {get;set;}
    public int Quantite {get;set;}
    public EtatMateriel Etat {get;set;}
}