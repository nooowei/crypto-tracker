// reducer for updating historical coin data
const priceHistoryData = (state = {}, action) => {
    switch (action.type){
        case "LOAD_HISDATA":
            return action.hisData;
        default:
            return state;
    }
}

export default priceHistoryData;