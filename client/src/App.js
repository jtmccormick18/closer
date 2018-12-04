import React, { Component } from "react";
import * as $ from "axios";
import Button from "@material-ui/core/Button";

class App extends React.Component {
  state = {
    notesList: [],
    newNote: "",
    isUpdating: false
  };
  render() {
    return (
      <Button color="primary" variant="contained">Testing!!!</Button>
    );
  }
  componentDidMount(){
    this.getUsers();
  }
  getUsers=()=>{
    $.get('/api/users')
    .then(result=>{
      console.log(result.data)
    })
  }
  render(){
    return (<div></div>)
  }

  

 
}

export default App;
