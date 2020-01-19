import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

// VIEW component that renders the historical data chart with Chart JS
function CoinDataChart(props){
    let dataSet = {
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    return(
        <div className="chart">
            <Line
                data={props.priceHistoryData}
                options={{
                    title:{
                    display:true,
                    text:'Largest Cities In '+"chicago",
                    fontSize:25
                    },
                    legend:{
                    display:true,
                    position:'right'
                    }
                }}
                />


        </div>
    )
}

const mapStateToProps = (state) => ({
  coinData: state.coinData,
  userData: state.userData,
  currencyData: state.currencyData,
  priceHistoryData: state.priceHistoryData
})

export default connect(
  mapStateToProps
)(CoinDataChart);
