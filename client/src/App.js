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
import PartnerCreate from "./components/Partner";
import Flight from "./components/ResultsPage/Flight";
import PartnerUpdate from "./components/PartnerUpdate";
import Hotel from './components/ResultsPage/Hotel';




import PrivateRoute from "./components/PrivateRoute";

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
    isLoggedIn: false,
    hasPartner: false
  };

  componentDidMount() {
    this.getUsers();
  }
  childHandler = (ChildState) => {
    console.log(ChildState.loggedIn)
    this.setState({
      isLoggedIn: ChildState.loggedIn,
      hasPartner: ChildState.hasPartner
    })
    console.log(`isLoggedIn: ${this.state.isLoggedIn} hasPartner: ${this.state.hasPartner}`)
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
                  <img alt="closerLogo" src="././assets/clsr.logo-WHITE.png" height="40px" /></IconButton>
                </Link>
                <Typography variant="h6" color="inherit" className={`${classes.grow} ${classes.title}`}>
                  Closer
              </Typography>
                <NavLink to='/login'><Button color="inherit">Login</Button></NavLink>
                <NavLink to="/register"><Button color="inherit">Register</Button></NavLink>
              </Toolbar>
            </AppBar>
     
       

            <Switch>
              <Route exact path='/' component={HomePage} />
              <PrivateRoute exact path='/flight' component={Flight} />
              <Route exact path='/register' component={AccountCreate} />
              <PrivateRoute exact path='/results' component={ResultPage}/>
              <Route exact path='/login' component={()=><Login action={this.childHandler}/>}/>
              <PrivateRoute exact path='/partner' component={PartnerCreate} />
              <PrivateRoute exact path='/updatepartner' component={PartnerUpdate} />
              <PrivateRoute exact path='/hotel' component = {Hotel} />
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