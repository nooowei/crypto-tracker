import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux'
import {loadUser, loadCoin, changeCurrency, loadPriceHistory, loadGraphData} from '../actions/actions';

import CoinCard from './coin-card.component';
import graphData from '../reducers/graphDataReducer';

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

        this.props.loadPriceHistory(priceHistory);  //this is working
      }))
      .then(()=>{
        // this variable will be passed into redux store with loadGraphData method
        // containing a collection of all graph datas
        let graphDataSet = {};

        // this is the graph data for each coin, will be append into graphDataSet with name references
        let singleGraphData = {};

        let requestTime = 0;
        let requestType = "";
        // let requestCoin = this.props.coinName;
        let skipDay = 1;  // days/hours to skip while rendering chart

        switch(this.props.timeFrame){ //default to WEEKLY
          case "MONTHLY":
            requestTime = 28;
            requestType = "histoday"
            skipDay = 4
            break;
          case "WEEKLY":
            requestTime = 7;
            requestType = "histoday"
            skipDay = 1;
            break;
          case "DAILY":
            requestTime = 21;
            requestType = "histohour"
            skipDay = 3;
            break;
          default:
            requestTime = 7;
            requestType = "histoday";
            skipDay = 1;
        }

        // creating a singleGraphData for each coin, and add to graphDataSet
        for(let i = 0; i<this.state.coinArr.length; i++){
          let coinName = this.state.coinArr[i];
          let rawData = this.props.priceHistoryData[coinName]; //got to change this to do every coin, put in a for loop
          console.log(rawData); // make sure it's getting the right historical data
          let date;
          let labels = [];  // for storing dates
          let data = [];  // for storing price history data

          for(let i=rawData.length; i>(rawData.length-requestTime-1); i-=skipDay){  //skipping intervals of days/hours to render chart
            //check if index out of bound
            if(typeof rawData[i] !== "undefined"){
              // setting the labels
              date = new Date(rawData[i].time * 1000).toString().substring(4, 10); // leaving just the month and day
              labels.push(date);

              //setting the price data
              data.push(rawData[i].close);
            }
          }

          // flip the array to go from latest to earliest
          labels = labels.reverse();
          data = data.reverse();

          let datasets = [{
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }];

          singleGraphData = {
            labels,
            datasets
          }

          graphDataSet[coinName] = singleGraphData;

        }


        // // create a graphData object from props.priceHistory for chart.js to render
        // let rawData = this.props.priceHistoryData[this.props.coinName]; //got to change this to do every coin, put in a for loop
        // console.log(rawData);
        // let date;
        // let labels = [];  // for storing dates
        // let data = [];  // for storing price history data

        // if(typeof rawData !== 'undefined'){ //check to make sure data has loaded
        //   // iterate through the data and populate datasets
        //   for(let i=rawData.length; i>(rawData.length-requestTime-1); i-=skipDay){  //skipping intervals of days/hours to render chart
        //     //check if index out of bound
        //     if(typeof rawData[i] !== "undefined"){
        //       // setting the labels
        //       date = new Date(rawData[i].time * 1000).toString().substring(4, 10); // leaving just the month and day
        //       labels.push(date);

        //       //setting the price data
        //       data.push(rawData[i].close);
        //     }
        //   }

        //   // flip the array to go from latest to earliest
        //   labels = labels.reverse();
        //   data = data.reverse();

          // database that will be added to graph data object for charts
          
      })
      .catch(err => console.log(err));

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
  loadPriceHistory: hisData => dispatch(loadPriceHistory(hisData)),
  loadGraphData: graphData => dispatch(loadGraphData(graphData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsContainer);
