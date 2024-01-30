// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'; // Importer la page Login
import Inscription from './pages/Inscription'; // Importer la page Inscription
import AccueilO from './pages/AccueilO';
import OpeningPage from './pages/PremierePage';
import GlobalStyles from './styles/Global.css'; // Importez le style global

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inscription" component={Inscription} />
        <Route path="/accueil" component={AccueilO}/>
        <Route path="/connexion" component={Login} />
        <Route path="" component={OpeningPage}/>
        {/* Ajoutez d'autres routes pour d'autres pages */}
        {/* <Route path="/home" component={Home} /> */}
        {/* ... */}
      </Switch>
    </Router>
  );
}

export default App;
