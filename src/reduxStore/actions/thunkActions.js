import { fetch, setLatestPrice, setChart, setCompany, addData, removeData } from '../actionCreator';
import { getLatestStockPrice, getChart, getCompany } from '../../lib/stockApi';

// const MAX_REQUEST_TIME = 5000;

export const search = () => ( dispatch, getState ) => {
  let { current: { symbol }, cache, current } = getState();

  if( symbol !== '' ){
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
      })
      .catch( ( msg ) => console.log( msg ));
    // dispatch( updateLatestPrice( symbol));
    // dispatch( updateChartData( symbol ));
    // dispatch( updateCompany( symbol ));
    // dispatch( addData() );
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

const controllerCache = ( symbol ) => ( dispatch, getState ) => {
  const { cache, current } = getState();
  let c = cache.filter( ( data ) => {
        return (data.symbol === symbol)
      } );
  console.log( c.length );
  if( c.length !== 0 ){
    //ja tem o dado no cache
    //resta apenas setar
  }else{
      if( cache.length >= 10 ){ dispatch( removeData(0)) }
      dispatch( addData( current) );
  }  
}
