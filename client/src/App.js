import React from 'react';
import PropTypes from 'prop-types';
import * as $ from "axios";
import { AppBar, Toolbar, Typography, Button, IconButton, withStyles } from '@material-ui/core';
import { BrowserRouter, Route, Link, Switch, NavLink } from "react-router-dom";
import AccountCreate from './components/CreateAccount';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import ResultPage from './components/ResultsPage/ResultPage';
import Airport from "./components/Airport"
import MidPoint from './components/MidPoint';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends React.Component {
  state = {
    userList: [],
    isCreatingAccount: false,
    isLoggedIn: true
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    $.get("/api/users").then(result => {
      console.log(result.data);
      this.setState({
        userList: result.data
      })
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <BrowserRouter>
          <div>
            <AppBar position="static">
              <Toolbar>
                <Link to='/'><IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <img alt="closerLogo" src="././assets/clsr.logo.png" height="40px" /></IconButton>
                </Link>
                <Typography variant="h6" color="inherit" className={`${classes.grow} ${classes.title}`}>
                  Closer
              </Typography>
                <NavLink to='/login'><Button color="inherit">Login</Button></NavLink>
                <NavLink to="/register"><Button color="inherit">Register</Button></NavLink>
              </Toolbar>
            </AppBar>
            <MidPoint/>

            <Switch>
              <Route exact path='/' component={this.state.isLoggedIn ? (ResultPage):(HomePage)} />
              <Route exact path='/register' component={AccountCreate} />
              <Route exact path='/login' component={Login} />
              <Route path='*' component={ErrorPage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }

}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App);