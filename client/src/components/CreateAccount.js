import React from "react";
import * as $ from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Airport from "./Airport";

const Form = props => (
  <Grid container justify="center">
    <form className="createAccountForm" >
      <Typography align="center" variant="h4" color="inherit">
        Create an Account
          </Typography>
      <hr />
      <MenuItem>
        Name:
    <input
          type="text"
          name="username"
          value={props.userVal}
          onChange={props.handleChange}

        />
      </MenuItem>
      <MenuItem>
        Password:
    <input
          type="password"
          name="password"
          value={props.passVal}
          onChange={props.handleChange}
        /> </MenuItem>
      <MenuItem>
        Nickname:
    <input
          type="text"
          name="nickname"
          value={props.nickVal}
          onChange={props.handleChange}
        /></MenuItem> <MenuItem>
        Airport:
    <input
          type="text"
          name="airport"
          value={props.airVal}
          onChange={props.handleChange}
        /></MenuItem>
      <MenuItem>
        Email:
    <input
          type="text"
          name="email"
          value={props.eVal}
          onChange={props.handleChange}
        /></MenuItem>
      <MenuItem>
        Budget:
    <input
          type="text"
          name="budget"
          value={props.budgetVal}
          onChange={props.handleChange}
        /></MenuItem>
      <Button aligntItem="center" type="submit" onClick={props.submitUser}>
        Create Account
    </Button>
    </form>
  </Grid>
);

class AccountCreate extends React.Component {
  state = {
    username: "",
    password: "",
    nickname: "",
    airport: "",
    email: "",
    budget: ""
  };

  componentDidMount() { }
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  createUser = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password,
      nickname: this.state.nickname,
      airport: this.state.airport,
      email: this.state.email,
      budget: this.state.budget
    };
    console.log(userData)
    $.post("/api/users", userData)
      .then(resp => {
        console.log(resp);
        alert("Thanks for Creating an account, Please Login to continue.");
      })
      .catch(err => {
        alert('Fill out the entire form!')
      })
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
          budgetVal={this.state.budget}
          eVal={this.state.email}
          submitUser={this.createUser}
        />
      </div>
    );
  }
}

export default AccountCreate;
