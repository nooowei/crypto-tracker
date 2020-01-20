import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Container, Typography, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import { Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, IconButton} from '@material-ui/core';
// import { FirstPageIcon, KeyboardArrowLeft, KeyboardArrowRight, LastPageIcon} from '@material-ui/icons';
import { connect } from 'react-redux';
import { styled, makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MoreInfoTable from './more-info-table.component';
import CoinDataChart from './chart.component';
import {loadPriceHistory, chgTimeFrame, loadGraphData} from '../actions/actions';

// this is Styled Component API using hooks
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
}));

// VIEW component
function CoinCardDisplay(props){
  const classes = useStyles();
  return(
    <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
          <Container>
            <p>coin icons go here</p>

            <List button component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
                <ListItemText primary={props.coinData.coinName} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Price: ${props.coinData.price}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`24 Hour Change: ${props.coinData.chg24Hour}`} />
              </ListItem>
            </List>
          </Container>

        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Container>
              <CoinDataChart/>
              <MoreInfoTable coinData={props.coinData}/>
            </Container>

        </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}


// CONTAINER component
class CoinCard extends Component{
    // useless constructor so far
    constructor(props){
        super(props);
        this.getCoinData = this.getCoinData.bind(this);
        this.getHistoricalData = this.getHistoricalData.bind(this);
    }

    componentDidMount(){
      this.getHistoricalData();
    }

    //combine all data into an object and pass it into the View Component
    getCoinData(){
      let coinName = this.props.coinName;
      let data = this.props.coinData;
      let currentCoin = data[coinName];
      let currency = 'USD'  //replace w/ user input later
      let currencyData = currentCoin[currency];

      let price = currencyData.PRICE;
      price = price.toFixed(2);

      let chg24Hour = currencyData.CHANGE24HOUR;
      chg24Hour = chg24Hour.toFixed(2);

      let chgDay = currencyData.CHANGEDAY;
      chgDay = chgDay.toFixed(2);

      let chgHour = currencyData.CHANGEHOUR;
      chgHour = chgHour.toFixed(2);

      let chgEpct24HR = currencyData.CHANGEPCT24HOUR;
      chgEpct24HR = chgEpct24HR.toFixed(2);

      let chgEpctDay = currencyData.CHANGEPCTDAY;
      chgEpctDay = chgEpctDay.toFixed(2);

      let chgEpctHour = currencyData.CHANGEPCTHOUR;
      chgEpctHour = chgEpctHour.toFixed(2);

      let high24Hour = currencyData.HIGH24HOUR;
      high24Hour = high24Hour.toFixed(2);

      let highDay = currencyData.HIGHDAY;
      highDay = highDay.toFixed(2);

      let highHour = currencyData.HIGHHOUR;
      highHour = highHour.toFixed(2);

      let low24Hour = currencyData.LOW24HOUR;
      low24Hour = low24Hour.toFixed(2);

      let lowDay = currencyData.LOWDAY;
      lowDay = lowDay.toFixed(2);

      let lowHour = currencyData.LOWHOUR;
      lowHour = lowHour.toFixed(2);

      let mktCap = currencyData.MKTCAP;
      mktCap = mktCap.toFixed(2);

      let supply = currencyData.SUPPLY;
      supply = supply.toFixed(2);

      let volumn24Hour = currencyData.VOLUME24HOUR;
      volumn24Hour = volumn24Hour.toFixed(2);

      let volumnHour = currencyData.VOLUMEHOUR;
      volumnHour = volumnHour.toFixed(2);

      let volumnDay = currencyData.VOLUMEDAY;
      volumnDay = volumnDay.toFixed(2);

      let coinData = {
        coinName,
        price,
        chg24Hour,
        chgDay,
        chgHour,
        chgEpct24HR,
        chgEpctDay,
        chgEpctHour,
        high24Hour,
        highDay,
        highHour,
        low24Hour,
        lowDay,
        lowHour,
        mktCap,
        supply,
        volumn24Hour,
        volumnDay,
        volumnHour
      }
      return coinData;
    }

    getHistoricalData(){
      // console.log(this.props.timeFrame);
      // API params
      let requestTime = 0;
      let requestType = "";
      let requestCoin = this.props.coinName;
      let skipDay = 1;  // days/hours to skip while rendering chart

      switch(this.props.timeFrame){
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


      // create a graphData object from props.priceHistory for chart.js to render
      let rawData = this.props.priceHistoryData[this.props.coinName];
      console.log(rawData);
      let date;
      let labels = [];  // for stroing dates
      let data = [];  // for stroing price history data

      if(typeof rawData !== 'undefined'){ //check to make sure data has loaded
        // iterate through the data and populate datasets
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

        // database that will be added to graph data object for charts
        let datasets = [{
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }];

        let graphData = {
          labels,
          datasets
        }
        console.log(graphData);
        this.props.loadGraphData(graphData); //need to change to an action that edits the graph data
      }else{
        
      }

      // let requestString = `https://min-api.cryptocompare.com/data/v2/${requestType}?fsym=${requestCoin}&tsym=USD&limit=${requestTime}`;

      // axios.get(requestString).then(res => {
      //   // console.log(res.data.Data.Data);
      //   // get info from data, and format into an object and pass into props
      //   let rawData = res.data.Data.Data;

      //   let date;
      //   let labels = [];  // for stroing dates
      //   let data = [];  // for stroing price history data

      //   // iterate through the data and populate datasets
      //   for(let i=requestTime; i>0; i-=skipDay){  //skipping intervals of days/hours to render chart
      //     // setting the labels
      //     date = new Date(rawData[i].time * 1000).toString().substring(4, 10); // leaving just the month and day
      //     labels.push(date);

      //     //setting the price data
      //     data.push(rawData[i].close);
      //   }

      //   // database that will be added to graph data object for charts
      //   let datasets = [{
      //     data,
      //     backgroundColor: 'rgba(54, 162, 235, 0.6)'
      //   }];

      //   let graphData = {
      //     labels,
      //     datasets
      //   }
      //   // console.log(graphData);
      //   this.props.loadPriceHistory(graphData);
      // }
      // ).catch(err => console.log(err));



    }

    // <CoinCardDisplay coinData={this.getCoinData()} getHistoricalData={this.getHistoricalData()}/>
    render(){
        return (
          <CoinCardDisplay coinData={this.getCoinData()}/>
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
  loadPriceHistory: hisData => dispatch(loadPriceHistory(hisData)),
  chgTimeFrame: timeFrame => dispatch(chgTimeFrame(timeFrame)),
  loadGraphData: graphData => dispatch(loadGraphData(graphData))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoinCard);
