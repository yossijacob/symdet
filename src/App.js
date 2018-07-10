import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase from 'firebase'
import { FireBaseAuthUI } from './firebase'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNav from './content/BottomNav'
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import LogSymptomDialog from './content/LogSymptomDialog'
import Splash from './content/Splash'
import Symlog, { SymLogAppBar } from './content/SymLog'
import Analyze, { AnalyzeAppBar } from './content/Analyze'
import Calendar, { CalendarAppBar } from './content/Calendar'


const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const pageTitles = {
  symlog: 'Symptom Log'
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
      addDialogOpen: false,
    };
  }

  toggleAddDialog = (val) => {
    this.setState({ addDialogOpen: val });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
          loading: false
        });
      }
      else {
        this.setState({
          loggedIn: false,
          loading: false
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div>
          {!this.state.loggedIn ?
            this.state.loading ?
              <Splash />
              :
              <FireBaseAuthUI />
            :
            <div>
              <AppBar position="static">
                <Toolbar>
                  <IconButton color="inherit" aria-label="Menu" className={classes.menuButton}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    <Route path="/symlog" component={SymLogAppBar} />
                    <Route path="/calendar" component={CalendarAppBar} />
                    <Route path="/Analyze" component={AnalyzeAppBar} />
                  </Typography>
                  <IconButton color="inherit" aria-label="Menu">
                    <AddIcon onClick={() => this.toggleAddDialog(true)} />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route path="/symlog" component={Symlog} />
                <Route path="/calendar" component={Calendar} />
                <Route path="/Analyze" component={Analyze} />
                <Redirect from='/' to='/symlog' />
              </Switch>
              <BottomNav/>
              <LogSymptomDialog open={this.state.addDialogOpen} toggleDialog={this.toggleAddDialog} />
            </div>
          }

        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
