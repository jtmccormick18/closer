import React from "react";
import * as $ from "axios";

const Form = props => (
  <form>
    <input
      type="text"
      name="username"
      value={props.userVal}
      onChange={props.handleChange}
    />
    <input
      type="text"
      name="password"
      value={props.passVal}
      onChange={props.handleChange}
    />
    <button type="submit" onClick={props.submitUser}>
      Create Account
    </button>
  </form>
);

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    loggedIn:false
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
        console.log(resp);
        alert("Login Successgul!");
        this.setState({loggedIn:true})
      })
      .catch(err=>{
        alert('Username or Password is incorrect')
      })
  };
  render() {
    return (
      <Form
        handleChange={this.handleChange}
        userVal={this.state.username}
        passVal={this.state.password}
        submitUser={this.loginUser}
      />
    );
  }
}

export default Login;