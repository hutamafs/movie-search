import './App.css';
import React from 'react';
import Home from './pages/Home';
import Detail from './components/Detail'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:id' component={Detail}/>
        <Route exact path='/' component={Home}/>
      </Switch>
    </Router>    
  );
}

export default App;
