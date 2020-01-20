// loading the user data once retrieved from backend DB
const timeFrameData = (state = "MONTHLY", action) => {
    switch (action.type) {
      case "CHG_TIMEFRAME":
        return action.timeFrame;
      default:
        return state;
    }
  }
  
export default timeFrameData;