import { fetch, 
  addData, 
  removeData, 
  setCurrent, 
  cancelFetch, 
  setError, 
  setChart } from '../actionCreator';
import { getLatestStockPrice, 
  getChart, 
  getCompany } from '../../lib/stockApi';

const DATE_FORMAT = { 
  year:'2-digit', 
  month: 'numeric', 
  timeZone: 'America/Sao_Paulo', 
  day: 'numeric'};

export const search = () => ( dispatch, getState ) => {
  let { current: { symbol }, cache} = getState();

  if( symbol !== '' ){
    let companyData = cache.find( ( data ) => {
      return (data.symbol === symbol);
    } );
    
    if( companyData ) {
      dispatch( setCurrent(companyData) );
      return; }
    
    dispatch( fetch() );
    Promise.all([
      fetchLatestPrice( symbol ),
      fetchCompany( symbol ),
      fetchDataChart( symbol ),
    ])
      .then( ([ latestPrice, company, chartData ]) => {
        let companyData = { latestPrice, company, chartData, symbol };
        // dispatch( setLatestPrice(latestPrice) );
        // dispatch( setCompany( company ) );
        // dispatch( setChart( chartData ) );
        dispatch( setCurrent( companyData ));
        dispatch( controllerCache( symbol ) );
        dispatch( cancelFetch() );
      })
      .catch( () => {
        dispatch( cancelFetch() );
        dispatch( setCurrent() );
        dispatch( actionSetError('Dados não encontrado') );
      }
      );
  }else{
    dispatch( cancelFetch() );
    dispatch( actionSetError('Campo Obrigatório') );
  }
};

const fetchLatestPrice = ( symbol ) => {
  return new Promise(( resolve, reject ) => {
    getLatestStockPrice( symbol )
      .then( response =>{
        if( response.ok ){
          response.json().then( values => resolve( values.latestPrice ));
        }else{
          reject( 'not found' );
        }
      })
      .catch( () => reject( 'error on lastest' ));
  }); 
};

const actionSetError = ( msg ) => ( dispatch ) => {
  dispatch( setError(msg) );
  setTimeout(() => {
    dispatch( setError('') );
  }, 6000);
};

const fetchCompany = ( symbol) => {
  return new Promise( (resolve, reject) => {
    getCompany( symbol )
      .then( response => {
        if( response.ok ){
          response.json().then( values => {
            resolve( values );
          }
          );
        }else{
          reject( 'not found' );
        }
      }).catch( () => reject(' error on Company') );
  } );

};

const fetchDataChart = (symbol) => {
  return new Promise( (resolve, reject) => {
    getChart( symbol )
      .then( response => {
        if( response.ok ){
          response.json().then( values => { 
            let formatedData = values.map( ( value ) => {
              return {
                date: new Date( value.date ).toLocaleString('pt-br', DATE_FORMAT),
                price: value.close
              };
            } );
            resolve( formatedData );
          });
        }else{
          reject('not found');
        }
      } ).catch( () =>reject(' error on Chart Data'));
  } );
};


export const fetchChartByRange = ( range = '1m' ) => ( dispatch, getState) => {
  getChart( getState().current.symbol, { range } ).then( response => {
    if( response.status === 200 ){
      response.json().then( ( values ) => {
        let formatedData = range === '1d'
          ? (
            values.map( value => ({
              date: value.minute,
              price: value.close
            }))
          )
          : (
            values.map( ( value ) => ({ 
              date: new Date( value.date ).toLocaleString('pt-br', DATE_FORMAT),
              price: value.close
            }))
          );
        dispatch( setChart( formatedData ));
     
      } );
    }
  } );
};

const controllerCache = () => ( dispatch, getState ) => {
  const { cache, current } = getState();
  if( cache.length >= 10 ) dispatch( removeData(0));
  dispatch( addData( current ) );
  
};
