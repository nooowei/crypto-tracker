import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux'
import {loadUser, loadCoin, changeCurrency} from '../actions/actions';

import CoinCard from './coin-card-component';

// CONTAINER component
class CardsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      coinArr: ["BTC","BCH","ETH","ETC","BSV"]
    }
  }

  componentDidMount(){
    let coinArrString = this.state.coinArr.toString();
    let initialLoadURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinArrString}&tsyms=USD,EUR,JPY&api_key=1f84fbac036921128f048004f3765eb58b91b7b7df920876211063157360463d`;
    axios.get(initialLoadURL).then(res =>{
      this.props.loadCoin(res.data.RAW);
      console.log(res.data.RAW);
      }
    )
    // console.log(this.props.currencyData)
  }

  // for testing only, delete later
  makeCard(){
    let price = this.props.coinData
    return(price);
  }

  render(){
    return(
      <div>
        <Container maxWidth="sm">
          <p>{this.props.currencyData} </p>
          {/* <p>{console.log(this.makeCard())}</p> */}
          {this.state.coinArr.map(coinName =>
            <CoinCard coinName={coinName}></CoinCard>
            )}
          <p>
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
            lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80 lorem 80
          </p>
        </Container>
      </div>
    )
  }

}

const mapStateToProps = (state) => (
  //this returns an object containing data needed by this connected component
  // each field in this object will become a prop of this connected component
    {
      coinData: state.coinData,
      userData: state.userData,
      currencyData: state.currencyData
    }
)

const mapDispatchToProps = dispatch => ({
  loadCoin: coins => dispatch(loadCoin(coins)),
  loadUser: user => dispatch(loadUser(user)),
  changeCurrency: currency => dispatch(changeCurrency(currency))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
