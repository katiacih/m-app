let server = 'https://api.iextrading.com/1.0';

export const getCompany = ( symbol ) => {
  return fetch(
    `${server}/stock/${symbol}/company`,
    {
      method: 'GET'
    }
  );
};

export const getLatestStockPrice = ( symbol ) => {
  return fetch(
    `${server}/stock/${symbol}/quote`,
    {
      method: 'GET'
    }
  );
};


export const getChart = ( symbol, options = { range: '1m' } ) => {
  return fetch(
    `${server}/stock/${symbol}/chart/${options.range}`,
    {
      method: 'GET'
    }
  );
};


