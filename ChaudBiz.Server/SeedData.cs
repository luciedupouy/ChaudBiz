public class SeedData {
    public void Init(){
        using var context = new ChaudBizContext();
        if (context.Materiels.Any()){
            return;
        }
        Materiel tube_frigorifique = new()
        {
            Label = "tube figorique",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel cable_elec_3G_15 = new()
        {
            Label = "câble électrique 3G 1,5",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel cable_elec_3G_25 = new()
        {
            Label = "câble électrique 3G 2,5",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel tube_vidange_diam = new()
        {
            Label = "tube vidange diamètre 32",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel tube_cuivre_28 = new()
        {
            Label = "tube cuivre diamètre 28",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel tube_cuivre_22 = new()
        {
            Label = "tube cuivre diamètre 22",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
       Materiel tube_cuivre_16 = new()
        {
            Label = "tube cuivre diamètre 16",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel cable_elec_6G = new()
        {
            Label = "câble électrique 6G",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel differentielle = new()
        {
            Label = "différentielle",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel contacteur = new()
        {
            Label = "contacteur",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel pots_a_boue = new()
        {
            Label = "pots à boue",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel disconnecteur = new()
        {
            Label = "disconnecteur",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel disjoncteur_16A = new()
        {
            Label = "disjoncteur 16A",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel disjoncteur_32A = new()
        {
            Label = "disjoncteur 32A",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel conduit_fumee = new()
        {
            Label = "conduit de fumée",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel disjoncteur = new()
        {
            Label = "disjoncteur",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel echelle = new()
        {
            Label = "echelle",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel raccord_cuivre = new()
        {
            Label = "raccord cuivre",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        Materiel raccord_laiton = new()
        {
            Label = "raccord laiton",
            Quantite = 1,
            Etat = EtatMateriel.DISPONIBLE
        };
        context.Materiels.AddRange(
            raccord_cuivre,
            raccord_laiton,
            echelle,
            disjoncteur,
            disjoncteur_16A,
            disjoncteur_32A,
            conduit_fumee,
            disconnecteur,
            pots_a_boue,
            differentielle,
            tube_cuivre_16,
            tube_cuivre_22,
            tube_cuivre_28,
            tube_frigorifique,
            tube_vidange_diam,
            cable_elec_3G_15,
            cable_elec_3G_25,
            cable_elec_6G,
            contacteur
        );
        MaterielChantier clim = new() {
            TypeC = TypeChantier.CLIMATISATION,
            Materiels = new List<Materiel> {tube_frigorifique,cable_elec_3G_15,cable_elec_3G_25,tube_vidange_diam}
        };
        MaterielChantier pompe = new(){
            TypeC =TypeChantier.POMPE,
            Materiels = new List<Materiel>{tube_cuivre_28,tube_cuivre_16,cable_elec_3G_15,cable_elec_3G_25,cable_elec_6G,differentielle,contacteur,pots_a_boue,disconnecteur,disjoncteur_16A,disjoncteur_32A,tube_frigorifique}
        };
        MaterielChantier chaudiere = new(){
            TypeC = TypeChantier.CHAUDIERE,
            Materiels = new List<Materiel>{tube_cuivre_22,tube_cuivre_16,conduit_fumee,disjoncteur,echelle,raccord_cuivre,raccord_laiton}
        };
        context.MaterielChantiers.AddRange(
            clim,
            pompe,
            chaudiere
        );
        context.SaveChanges();
    }
}