import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

// VIEW component - maybe add in addFavourite function later
class CoinCard extends Component{
//     // useless constructor so far
//   constructor(props){
//     super(props);
//   }

    getCoinData(){
        let coinName = this.props.coinName;
        let data = this.props.coinData;
        let currentCoin = data[coinName];
        let price = currentCoin.USD.PRICE;
        console.log(price);
        return price
    }

    render(){
    return(
        <Container>
            <Typography>
                {this.getCoinData()}
            </Typography>


        </Container>
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