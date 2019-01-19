import { fetch, cancelFetch, setLatestPrice, setChart, setCompany, addData } from '../actionCreator';
import { getLatestStockPrice, getChart, getCompany } from '../../lib/stockApi';

// const MAX_REQUEST_TIME = 5000;

export const search = () => ( dispatch, getState ) => {
  let { current: { symbol }, cache, current } = getState();

  if( symbol !== '' ){
    dispatch( fetch() );
    // checkCache( symbol, cache );

    Promise.all([
      fetchLatestPrice( symbol ),
      fetchCompany( symbol ),
    ])
      .then( ([ latestPrice, company ]) => {
        dispatch (fetchChartData( symbol ));
        dispatch( setLatestPrice(latestPrice) );
        dispatch( setCompany(company) );
        dispatch( controllerCache() );
      })
      .catch( ( msg ) => console.log( msg ));
    // dispatch( updateLatestPrice( symbol));
    // dispatch( updateChartData( symbol ));
    // dispatch( updateCompany( symbol ));
    dispatch( addData() );
  }else{
    alert( 'ERRO' );
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
  const { cache } = getState();
  if( cache.length >= 2 ){
      console.log( 'ta cheio' );
      console.log(cache.length);
  }else{
    console.log(cache.length);
  }
  
}
