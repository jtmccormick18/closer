import React, { Component } from "react";
import * as $ from "axios";
import AppBar from "./components/AppBar";
import Flight from './components/Flight'

class App extends React.Component {
  state = {
    userList: [],
    isCreatingAccount: false,
    isLoggedIn: false
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
    return (<div>
      <AppBar />
      <Flight />
    </div>)

  }
}
export default App;
