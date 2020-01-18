import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper } from '@material-ui/core';
// import { connect } from 'react-redux'
// import {loadUsers, loadLogs} from '../actions/userAction';


class CardsContainer extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    axios.get()
  }

  render(){
    return(
      <div>
        <Container maxWidth="sm">
          <p>lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 </p>
          <p>
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
          </p>
          <p>
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
          </p>
        </Container>
      </div>
    )
  }

}

export default CardsContainer;
