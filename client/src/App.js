import React, { Component } from "react";
import * as $ from "axios";
import AppBar from "./components/AppBar";

class App extends React.Component {
  state = {
    userList: [],
    newNote: "",
    isUpdating: false
  };

  componentDidMount() {
    this.getUsers();
    this.setState({
      userList: this.getUsers()
    })
  }
  getUsers = () => {
    $.get("/api/users").then(result => {
      console.log(result.data);
    });
  };
  render() {
    return <AppBar />;
  }
}

export default App;
