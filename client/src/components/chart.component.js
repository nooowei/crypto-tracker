import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

// VIEW component that renders the historical data chart with Chart JS
function CoinDataChart(props){
    // let dataSet = {
    //     labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    //     datasets:[
    //       {
    //         label:'Population',
    //         data:[
    //           617594,
    //           181045,
    //           153060,
    //           106519,
    //           105162,
    //           95072
    //         ],
    //         backgroundColor:[
    //           'rgba(255, 99, 132, 0.6)',
    //           'rgba(54, 162, 235, 0.6)',
    //           'rgba(255, 206, 86, 0.6)',
    //           'rgba(75, 192, 192, 0.6)',
    //           'rgba(153, 102, 255, 0.6)',
    //           'rgba(255, 159, 64, 0.6)',
    //           'rgba(255, 99, 132, 0.6)'
    //         ]
    //       }
    //     ]
    //   }
    let coinName = props.coinName;
    return(
        <div className="chart">
            <Line
                data={props.graphData[coinName]}
                options={{
                    title:{
                    display:true,
                    text:'Price History',
                    fontSize:25
                    },
                    legend:{
                      display:false,
                      position:'right'
                    },
                    animation: {
                      duration: 20000,


                  }
                }}
                />


        </div>
    )
}

const mapStateToProps = (state) => ({
  // coinData: state.coinData,
  // userData: state.userData,
  // currencyData: state.currencyData,
  // priceHistoryData: state.priceHistoryData,
  graphData: state.graphData
})

export default connect(
  mapStateToProps
)(CoinDataChart);
