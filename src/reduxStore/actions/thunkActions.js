import { fetch, setLatestPrice, setChart, setCompany, addData, removeData, setCurrent, cancelFetch, setError } from '../actionCreator';
import { getLatestStockPrice, getChart, getCompany } from '../../lib/stockApi';

export const search = () => ( dispatch, getState ) => {
  let { current: { symbol }, cache, current } = getState();

  if( symbol !== '' ){
    let companyData = cache.find( ( data ) => {
      return (data.symbol === symbol);
    } );
    
    if( companyData ) return dispatch( setCurrent(companyData) );
    
    dispatch( fetch() );
    Promise.all([
      fetchLatestPrice( symbol ),
      fetchCompany( symbol ),
    ])
      .then( ([ latestPrice, company ]) => {
        dispatch( fetchChartData( symbol ));
        dispatch( setLatestPrice(latestPrice) );
        dispatch( setCompany( company ) );
        dispatch( controllerCache( symbol) );
        dispatch( cancelFetch() );
      })
      .catch( ( msg ) => {
        dispatch( cancelFetch() );
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
            // console.log( values );
            resolve( values );
          }
          );
        }else{
          reject( 'not found' );
        }
      }).catch( () => reject(' error on Company') );
  } );

};


const fetchChartData = ( symbol ) => ( dispatch ) => {
  getChart( symbol ).then( response => {
    // console.log( response.body);
    if( response.status === 200 ){
      response.json().then( (data) => {
        dispatch( setChart( data ) );
        // console.log( data );
      } );
    }
  } );

};

const controllerCache = () => ( dispatch, getState ) => {
  const { cache, current } = getState();
  if( cache.length >= 10 ) dispatch( removeData(0));
  dispatch( addData( current ) );
  
};
