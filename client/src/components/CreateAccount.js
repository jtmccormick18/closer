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
    <input
      type="text"
      name="nickname"
      value={props.nickVal}
      onChange={props.handleChange}
    />
    <input
      type="text"
      name="airport"
      value={props.airVal}
      onChange={props.handleChange}
    />
    <input
      type="text"
      name="email"
      value={props.eVal}
      onChange={props.handleChange}
    />
    <input
      type="text"
      name="budget"
      value={props.budgetVal}
      onChange={props.handleChange}
    />
    <button type="submit" onClick={props.submitUser}>
      Create Account
    </button>
  </form>
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

  componentDidMount() {}
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
    .catch(err=>{
      alert('Fill out the entire form!')
    })
  };
  render() {
    return (
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
    );
  }
}

export default AccountCreate;
