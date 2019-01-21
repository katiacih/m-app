
import { combineReducers } from 'redux';
import C from './constants';

const isFetching = ( state = false, action ) => {
  switch ( action.type ) {
  case C.FETCH:
    return true;
  case C.CANCEL_FETCH:
    return false;
  default:
    break;
  }
  return state;
};

const company = ( state = {}, action ) => {
  switch( action.type ){
  case C.SET_COMPANY:
    return action.payload;
  default:
    return state;
  }
};

const symbol = ( state = '', action ) => {
  switch ( action.type ) {
  case C.SET_SYMBOL:
    return action.payload;
  default:
    return state;
  }
};

const latestPrice = ( state = '', action ) => {
  switch ( action.type ) {
  case C.SET_LATEST_PRICE:
    return action.payload;
  default:
    return state;
  }
};

const chartData = ( state = [], action ) => {
  switch ( action.type ) {
  case C.SET_CHART_DATA:
    return action.payload;
  default:
    return state;
  }
};

const error = ( state ='', action ) => {
  switch ( action.type ){
  case C.SET_ERROR:
    return action.payload;
  default:
    return state;
  }
};

const cache = ( state=[], action )=> {
  switch( action.type ){
  case C.ADD_DATA:
    return [ ...state, action.payload ];
  case C.REMOVE_DATA:
    return ( action.payload.index 
      ? state.filter((data, index) => index !== action.payload.index)
      : state.filter((data, index) => data.symbol !== action.payload.symbol)
    );
  default:
    return state;
  }
};


const current = ( state = {}, action ) => {
  switch( action.type ){
  case C.SET_CURRENT_DATA:
    return action.payload;
  case C.SET_SYMBOL:
    return {...state, symbol: symbol( state.symbol, action )};
  case C.SET_LATEST_PRICE:
    return {...state, latestPrice: latestPrice( state.latestPrice, action )};
  case C.SET_CHART_DATA:
    return {...state, chartData: chartData( state.chartData, action )};
  case C.SET_COMPANY:
    return {...state, company: company( state.company, action )};
  default:
    return state;
  }
};

export default combineReducers({
  error,
  isFetching,
  cache,
  current
});