import { combineReducers } from 'redux'
// import user from './userReducer'
// import logs from './logReducer'
// import userArr from './userArrReducer'
import coinData from './coinDataReducer';
import userData from './userDataReducer';
import currencyData from './currencyDataReducer';
import priceHistoryData from './priceHistoryReducer';

//ES6 syntax, by naming the reducer the same as the content it is managing
// each of these reducers is responsible for each piece of state w/ same name
export default combineReducers({
    coinData,
    userData,
    currencyData,
    priceHistoryData
});
