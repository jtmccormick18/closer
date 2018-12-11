import React from "react";
import * as $ from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Airport from "./Airport";

const Form = props => (
  <Grid container justify="center">
    <form className="createAccountForm">
      <Typography align="center" variant="h4" color="inherit">
        Register
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
        />{" "}
      </MenuItem>
      <MenuItem>
        <span className="menuLabel">Nickname:</span>
        <input
          className="menuitem"
          type="text"
          name="nickname"
          value={props.nickVal}
          onChange={props.handleChange}
        />
      </MenuItem>

      <MenuItem>
        <span className="menuLabel">Email</span>
        <input
          className="menuitem"
          type="text"
          name="email"
          value={props.eVal}
          onChange={props.handleChange}
        />
      </MenuItem>
      {/* <MenuItem>
        <span className="menuLabel">Budget:</span>
        <input
          className="menuitem"
          type="text"
          name="budget"
          value={props.budgetVal}
          onChange={props.handleChange}
        />
      </MenuItem> */}
      <Airport onChange={props.handleChange} currAirport={props.airVal} />
      <div className="buttonbox">
        <Button align="center" type="submit" onClick={props.submitUser}>
          Create Account
        </Button>
      </div>
    </form>
  </Grid>
);

class AccountCreate extends React.Component {
  state = {
    username: "",
    password: "",
    nickname: "",
    airport: "",
    email: ""
  };

  componentDidMount() {}
  handleChange = (e, values) => {
    values = e.target.name ? e.target : values;
    const { name, value } = values;
    this.setState({
      [name]: value
    });
  };

  createUser = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
      nickname: this.state.nickname,
      airport: this.state.airport,
      email: this.state.email
    };
    console.log(userData);
    $.post("/api/users", userData)
      .then(resp => {
        console.log(resp);
        alert("Thanks for Creating an account, Please Login to continue.");
        window.location.replace('/login');
      })
      .catch(err => {
        alert("Fill out the entire form!");
      });
  };

  render() {
    return (
      <div>
        <Form
          handleChange={this.handleChange}
          userVal={this.state.username}
          passVal={this.state.password}
          nickVal={this.state.nickname}
          airVal={this.state.airport}
          eVal={this.state.email}
          submitUser={this.createUser}
        />
      </div>
    );
  }
}

export default AccountCreate;
