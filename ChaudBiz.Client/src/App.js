// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'; // Importer la page Login
import Inscription from './pages/Inscription'; // Importer la page Inscription
import AccueilO from './pages/AccueilO';
import OpeningPage from './pages/PremierePage';
import ChantierDetails from './pages/ChantierDetails'; // Importer la page de détails du chantier
import TodoMateriel from './pages/TodoMateriel';
import Planning from './pages/Planning';
import AccueilA from './pages/AccueilA';
import Chantier from './pages/Chantier';
import PlanningA from './pages/PlanningA';
import MaterielAttente from './pages/MaterielAttente';
import Client from './pages/Client';
import Rdv from './pages/Rdv';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/inscription" component={Inscription} />
        <Route path="/accueilo" component={AccueilO}/>
        <Route path="/accueila" component={AccueilA}/>
        <Route path="/ajoutchantier" component={Chantier}/>
        <Route path="/materiel" component={TodoMateriel}/>
        <Route path="/materielattente" component={MaterielAttente}/>
        <Route path="/connexion" component={Login} />
        <Route path="/planning" component={Planning}/>
        <Route path="/client" component={Client}/>
        <Route path="/rdv" component={Rdv}/>
        <Route path="/planninga" component={PlanningA}/>
        <Route path="/chantier/:chantierId" component={ChantierDetails} /> {/* Route pour les détails du chantier */}
        <Route path="" component={OpeningPage}/>
      </Switch>
    </Router>
  );
}

export default App;
