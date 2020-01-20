
const graphData = (state = {}, action) => {
    switch (action.type){
        case "LOAD_GRAPHDATA":
            return action.graphData;
        default:
            return state;
    }
}

export default graphData;



