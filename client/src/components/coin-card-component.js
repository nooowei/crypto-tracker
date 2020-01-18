import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Container, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import { connect } from 'react-redux';
import { styled } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { makeStyles } from '@material-ui/core/styles';

// this is Styled Component API, as opposed to 
const card = styled(theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

// VIEW component - maybe add in addFavourite function later
class CoinCard extends Component{
    // useless constructor so far
    constructor(props){
        super(props);
    }

    getCoinData(){
        let coinName = this.props.coinName;
        let data = this.props.coinData;
        let currentCoin = data[coinName];
        let price = currentCoin.USD.PRICE;
        console.log(price);
        return price;
    }
    
    // getClass(){
    //     const classes = useStyles();
    //     return classes;
    // }

    render(){
        return(
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </ExpansionPanelDetails>
        </ExpansionPanel>
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


export default connect(
    mapStateToProps,
)(CoinCard);