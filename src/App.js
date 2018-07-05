import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from 'firebase'
import { FireBaseAuthUI } from './firebase'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Splash from './Splash'
import Symlog from './SymLog'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('logged in');
        this.setState({
          loggedIn: true,
          loading: false
        });
      }
      else {
        console.log('not logged in');
        this.setState({
          loggedIn: false,
          loading: false
        });
      }
    });
  }


  render() {
    return (
      <Router>
        <div>
          {!this.state.loggedIn ?
            this.state.loading ?
              <Splash/>
            :
              <FireBaseAuthUI />
            :
            <div>
              <AppBar position="static">
                <Toolbar>
                  <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit">
                    Title
                </Typography>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route exact path="/" component={Symlog} />
                <Route path="/symlog" component={Symlog} />
              </Switch>
            </div>
          }

        </div>
      </Router>
    );
  }
}

export default App;
