import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './Pages/Game';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import Setting from './Pages/Setting';
import Login from './Pages/Login';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/setting" component={ Setting } />
      </Switch>
    );
  }
}
