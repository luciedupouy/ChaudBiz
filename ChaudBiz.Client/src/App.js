// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'; // Importer la page Login
import GlobalStyles from './styles/Global.css'; // Importez le style global

function App() {
  return (
    <Router>
      <Switch>
        <Route path="" component={Login} />
        {/* Ajoutez d'autres routes pour d'autres pages */}
        {/* <Route path="/home" component={Home} /> */}
        {/* ... */}
      </Switch>
    </Router>
  );
}

export default App;
