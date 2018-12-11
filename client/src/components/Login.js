import React from "react";
import * as $ from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
// import PartnerUpdate from "./PartnerUpdate";
// import CreatePartner from "./Partner";

const Form = props => (
  <Grid container justify="center">
    <form className="createAccountForm">
      <Typography align="center" variant="h4" color="inherit">
        Login
      </Typography>
      <hr />
      <MenuItem>
        <span className="menuLabel">Username:</span>
        <input
          className="menuitem"
          type="text"
          name="username"
          value={props.userVal}
          onChange={props.handleChange}
        />
      </MenuItem>
      <MenuItem>
        <span className="menuLabel">Password:</span>
        <input
          className="menuitem"
          type="password"
          name="password"
          value={props.passVal}
          onChange={props.handleChange}
        />
      </MenuItem>
      <Button align="center" type="submit" onClick={props.submitUser}>
        Login
      </Button>
    </form>
  </Grid>
);

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn: false,
    hasPartner: false
  };

  componentDidMount() {}
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  loginUser = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    $.post("/login", userData)
      .then(resp => {
        alert("Login Successful!");
        this.setState({ loggedIn: true });
        localStorage.token = resp.data.token;
        localStorage.clsr_id = resp.data.id;
        localStorage.clsr_username = resp.data.username;
        localStorage.clsr_airport= resp.data.airport;
        return $.get(`/api/partners/${localStorage.clsr_id}`);
      })
      .then(partners => {
        if (partners.data){
          this.setState({ hasPartner: true });
          this.props.action({
            loggedIn: this.state.loggedIn,
            hasPartner: this.state.hasPartner
          })
        } else {
          console.log("NO SIR")
        }
      })
      .catch(err => {
        alert("Username or Password is incorrect");
      });
  };
  render() {
    return (
      <div>
        
        <Form
          handleChange={this.handleChange}
          userVal={this.state.username}
          passVal={this.state.password}
          submitUser={this.loginUser}
        />
      </div>
    );
  }
}

export default Login;
