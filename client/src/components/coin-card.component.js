import React, { Component } from 'react';

import { Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import MoreInfoTable from './more-info-table.component';
import CoinDataChart from './chart.component';
import {loadPriceHistory, chgTimeFrame, loadGraphData} from '../actions/actions';

//import icons from localfile
import BCH_Icon from '../img/BCH.png';
import BTC_Icon from '../img/BTC.png';
import ETH_Icon from '../img/ETH.png';
import ETC_Icon from '../img/ETC.png';
import BSV_Icon from '../img/BSV.png';
import EOS_Icon from '../img/EOS.png';
import XRP_Icon from '../img/XRP.png';
import LTC_Icon from '../img/LTC.png';
import DASH_Icon from '../img/DASH.png';
import TUSD_Icon from '../img/TUSD.png';
import ZEC_Icon from '../img/ZEC.png';
import PAX_Icon from '../img/PAX.png';
import TRX_Icon from '../img/TRX.png';
import XMR_Icon from '../img/XMR.png';
import ADA_Icon from '../img/ADA.png';
import NEO_Icon from '../img/NEO.png';
import ATOM_Icon from '../img/ATOM.png';
import BNB_Icon from '../img/BNB.png';
import LINK_Icon from '../img/LINK.png';
import XLM_Icon from '../img/XLM.png';


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
  },
  img: {
    width: '10%',
    maxwidth: 100
  }
}));

// VIEW component
function CoinCardDisplay(props){
  const classes = useStyles();
  
  //setting the coin icons
  let coinIcon;
  switch(props.coinData.coinName){
    case "BTC":
      coinIcon = BTC_Icon;
      break;
    case "BCH":
      coinIcon = BCH_Icon;
      break;
    case "ETH":
      coinIcon = ETH_Icon;
      break;
    case "ETC":
      coinIcon = ETC_Icon;
      break;
    case "BSV":
      coinIcon = BSV_Icon;
      break;
    case "EOS":
      coinIcon = EOS_Icon;
      break;
    case "XRP":
      coinIcon = XRP_Icon;
      break;
    case "LTC":
      coinIcon = LTC_Icon;
      break;
    case "DASH":
      coinIcon = DASH_Icon;
      break;
    case "TUSD":
      coinIcon = TUSD_Icon;
      break;
    case "ZEC":
      coinIcon = ZEC_Icon;
      break;
    case "PAX":
      coinIcon = PAX_Icon;
      break;
    case "TRX":
      coinIcon = TRX_Icon;
      break;
    case "XMR":
      coinIcon = XMR_Icon;
      break;
    case "ADA":
      coinIcon = ADA_Icon;
      break;
    case "NEO":
      coinIcon = NEO_Icon;
      break;
    case "ATOM":
      coinIcon = ATOM_Icon;
      break;
    case "BNB":
      coinIcon = BNB_Icon;
      break;
    case "XLM":
      coinIcon = XLM_Icon;
      break;
    case "LINK":
      coinIcon = LINK_Icon;
      break;
    default:
      coinIcon = BTC_Icon;
  }
  return(
    <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
          <Container>
            <img className={classes.img} src={coinIcon}/>

            <List component="nav" aria-label="secondary mailbox folders">
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
