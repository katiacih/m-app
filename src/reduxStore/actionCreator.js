import C from './constants';

export const fetch = () => ({
  type: C.FETCH
});

export const cancelFetch = () => ({
  type: C.CANCEL_FETCH
});

export const setSymbol = ( data = '' ) => ({
  type: C.SET_SYMBOL,
  payload: data
});

export const setLatestPrice = ( data = '' ) => ({
  type: C.SET_LATEST_PRICE,
  payload: data
});

export const setChart = ( data = [] ) => ({
  type: C.SET_CHART_DATA,
  payload: data
});

export const setCompany = ( data = {} ) => ({
  type: C.SET_COMPANY,
  payload: data
});

export const setCurrent = ( data= {} ) => ({
  type: C.SET_CURRENT,
  payload: data
});

export const addData = ( data = {} ) => ({
  type: C.ADD_DATA,
  payload: data
});

/**
 * @description Prepares a redux action to add data to cache
 * @param {object} options 
 * @param {number} [options.index] Index value to be removed,
 * @param {string} [options.symbol] Symbol to be removed,
 * @returns {object} a redux action
 */
export const removeData  = ( options = { index: 0 } ) => ({
  type: C.ADD_DATA,
  payload: options
});
