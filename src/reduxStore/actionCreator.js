import C from './constants';

/**
 * @description Prepares a redux action fetch = true 
 * @returns {object} a redux action
 */
export const fetch = () => ({
  type: C.FETCH
});

/**
 * @description Prepares a redux action fetch = false 
 * @returns {object} a redux action
 */
export const cancelFetch = () => ({
  type: C.CANCEL_FETCH
});

/**
 * @description Prepares a redux action to set symbol  
 * @param {string} data  represent symbol to company
 * @returns {object} a redux action
 */
export const setSymbol = ( data = '' ) => ({
  type: C.SET_SYMBOL,
  payload: data
});

/**
 * @description Prepares a redux action to set latest price 
 * @param {string} data  represent latest price to company
 * @returns {object} a redux action
 */
export const setLatestPrice = ( data = '' ) => ({
  type: C.SET_LATEST_PRICE,
  payload: data
});

/**
 * @description Prepares a redux action to set data to chart 
 * @param {array} data Object array
 * @returns {object} a redux action
 */
export const setChart = ( data = [] ) => ({
  type: C.SET_CHART_DATA,
  payload: data
});

/**
 * @description Prepares a redux action to set company data 
 * @param {object} data Object company data
 * @returns {object} a redux action
 */
export const setCompany = ( data = {} ) => ({
  type: C.SET_COMPANY,
  payload: data
});

/**
 * @description Prepares a redux action to set current data 
 * @param {object} data Object current data
 * @returns {object} a redux action
 */
export const setCurrent = ( data= {} ) => ({
  type: C.SET_CURRENT_DATA,
  payload: data
});

/**
 * @description Prepares a redux action to set error message 
 * @param {string} data string
 * @returns {object} a redux action
 */
export const setError = ( data= '' ) => ({
  type: C.SET_ERROR,
  payload: data
});

/**
 * @description Prepares a redux action to add data to cache
 * @param {object} data current data
 * @returns {object} a redux action
 */
export const addData = ( data = {} ) => ({
  type: C.ADD_DATA,
  payload: data
});

/**
 * @description Prepares a redux action to remove data to cache
 * @param {object} options 
 * @param {number} [options.index] Index value to be removed,
 * @param {string} [options.symbol] Symbol to be removed,
 * @returns {object} a redux action
 */
export const removeData = ( options = { index: 0 } ) => ({
  type: C.ADD_DATA,
  payload: options
});
