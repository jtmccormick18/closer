import React, { Component } from 'react';
import * as $ from 'axios';



class App extends React.Component {

  state = {
    notesList: [],
    newNote: '',
    isUpdating:false
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
