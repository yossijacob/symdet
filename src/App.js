import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase from 'firebase'
import { FireBaseAuthUI } from './firebase'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNav from './content/BottomNav'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/AddCircleOutline';

import LogSymptomDialog,{ store as logSymptomDialogStore} from './content/LogSymptomDialog'
import Loading from './content/Loading'
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


class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loggedIn: false,
      // addDialogOpen: false,
      // editLog: null
    };
  }

  openAddDialog = () => {
    // this.setState({ addDialogOpen: val });
    // logSymptomDialogStore.open = true;
    logSymptomDialogStore.openDialog();
  };

  // openEditDialog = (log = null) => {
  //   logSymptomDialogStore.open = true;
  //   logSymptomDialogStore.editLog = log;
  //   // this.setState({
  //   //   addDialogOpen: log !== null,
  //   //   editLog: log
  //   // });
  // };

  // closeDialog = () => {
  //   logSymptomDialogStore.open = false;
  //   // this.setState({
  //   //   addDialogOpen: false,
  //   //   editLog: null
  //   // });
  // }
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
              <Loading />
              :
              <FireBaseAuthUI />
            :
            <div>
              <AppBar position="sticky">
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
                    <AddIcon onClick={() => this.openAddDialog(true)} />
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Switch>
                <Route path="/symlog" render={() =>
                  <Symlog />
                } />
                <Route path="/calendar" component={Calendar} />
                <Route path="/Analyze" component={Analyze} />
                <Redirect from='/' to='/symlog' />
              </Switch>
              <BottomNav />
              <LogSymptomDialog
                store = {logSymptomDialogStore}
                // open={this.state.addDialogOpen}
                // closeDialog={this.closeDialog}
                // editLog={this.state.editLog} 
                />
            </div>
          }

        </div>
      </Router>

    );
  }
}

export default withStyles(styles)(App);
