// loading the coin data once retrieved from API
const initalState = {
  BTC: {
    USD: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    EUR: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    JPY: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    }
  },
  BCH: {
    USD: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    EUR: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    JPY: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    }
  },
  ETH: {
    USD: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    EUR: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    JPY: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    }
  },
  ETC: {
    USD: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    EUR: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    JPY: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    }
  },
  BSV: {
    USD: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    EUR: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    },
    JPY: {
      PRICE: '',
      CHANGE24HR: '',
      CHANGE7D: ''
    }
  }
}
const coinData = (state = initalState, action) => {
    switch (action.type) {
      case "LOAD_COIN":
        return action.coins;
      default:
        return state
    }
  }
  
export default coinData;
  