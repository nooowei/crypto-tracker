// reducer for updating historical coin data

let initialState = {
    labels:[" "," "," "," "," "," "," "],
    datasets:[{
        data:[0,0,0,0,0,0,0]
    }]
}

const priceHistoryData = (state = initialState, action) => {
    switch (action.type){
        case "LOAD_HISDATA":
            return action.hisData;
        default:
            return state;
    }
}

export default priceHistoryData;