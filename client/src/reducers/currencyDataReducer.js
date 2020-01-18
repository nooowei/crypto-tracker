// loading the coin data once retrieved from API
const currencyData = (state = "USD", action) => {
    switch (action.type) {
      case "CHG_CUR":
        return action.currency;
      default:
        return state
    }
  }
  
export default currencyData;