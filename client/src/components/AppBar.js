import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AccountCreate from './CreateAccount';
import Login from './Login';
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

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Link to='/'><IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <img alt="closerLogo" src="././assets/clsr.logo.png" height="40px" /></IconButton>
              </Link>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Closer
          </Typography>
              <Link to='/login'><Button color="inherit">Login</Button></Link>
              <Link to="/register"><Button color="inherit">Register</Button></Link>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path='/' component={AppBar} />
            <Route exact path='/register' component={AccountCreate} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);