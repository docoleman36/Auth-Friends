import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';

import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <h1>My Many Friends</h1>
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>
      <Switch>
        {" "}
        {/*Switch will render the first appropriate component in the list. Start with the most restricted and work down*/}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
