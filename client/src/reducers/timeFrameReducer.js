// loading the user data once retrieved from backend DB
const timeFrameData = (state = "WEEKLY", action) => {
    switch (action.type) {
      case "CHG_TIMEFRAME":
        return action.timeFrame;
      default:
        return state;
    }
  }
  
export default timeFrameData;