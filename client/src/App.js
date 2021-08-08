import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminApp from './components/admin/AdminApp';
import PublicApp from './components/public/PublicApp';
import './App.css';

function App() {
  return (
    <>
      <Router>
          <div className="main-content-container">
            <Switch>
              <Route exact path="/" component={PublicApp}/>
              <Route exact path="/admin" component={AdminApp}/>
            </Switch>
          </div>
      </Router>
    </>
  );
}

export default App;
