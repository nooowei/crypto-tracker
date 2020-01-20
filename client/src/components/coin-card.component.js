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
              <CoinDataChart coinName={props.coinData.coinName}/>
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
        // this.getHistoricalData = this.getHistoricalData.bind(this);
    }

    // componentDidMount(){
    //   this.getHistoricalData();
    // }

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

    // getCoinName(){
      

    // }

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
