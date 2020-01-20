import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux'
import {loadUser, loadCoin, changeCurrency, loadPriceHistory, loadGraphData} from '../actions/actions';

import CoinCard from './coin-card.component';

// CONTAINER component
class CardsContainer extends Component{
  constructor(props){
    super(props);
    this.state={
      coinArr: ["BTC","BCH","ETH","ETC","BSV"]
    }
  }

  componentDidMount(){
    // get the table data for all coins
    let coinArrString = this.state.coinArr.toString();
    let initialLoadURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinArrString}&tsyms=USD,EUR,JPY&api_key=1f84fbac036921128f048004f3765eb58b91b7b7df920876211063157360463d`;
    axios.get(initialLoadURL).then(res =>{
      this.props.loadCoin(res.data.RAW);
      // console.log(res.data.RAW);
      }
    )

    //get price History for all coins
    this.getHistoricalData();

  }

  // on load, make API call for past 30 days then save it to props
  getHistoricalData(){
    // map each coinArr to request url
    let callArr = this.state.coinArr.map(name => axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${name}&tsym=USD&limit=30`));

    // use axios to make request of each coin's history concurrently
    axios.all(callArr)
      .then(axios.spread((...response) => {

        // an object for price history, use coinArr and responseArr to cross reference
        let priceHistory = {};

        for(let i=0; i<this.state.coinArr.length; i++){
          priceHistory[this.state.coinArr[i]] = response[i].data.Data.Data;
        }

        console.log(priceHistory);

        this.props.loadPriceHistory(priceHistory);
      })).catch(err => console.log(err));

  }

  render(){
    return(
      <div>
        <Container maxWidth="md">
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

const mapStateToProps = (state) => ({
      coinData: state.coinData,
      userData: state.userData,
      currencyData: state.currencyData,
      priceHistoryData: state.priceHistoryData,
      timeFrameData: state.timeFrameData,
      graphData: state.graphData
})

const mapDispatchToProps = dispatch => ({
  loadCoin: coins => dispatch(loadCoin(coins)),
  loadUser: user => dispatch(loadUser(user)),
  changeCurrency: currency => dispatch(changeCurrency(currency)),
  loadPriceHistory: hisData => dispatch(loadPriceHistory(hisData))
  // loadGraphData: graphData => dispatch(loadGraphData(graphData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
