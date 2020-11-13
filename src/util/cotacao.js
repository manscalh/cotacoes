const axios = require('axios');
const { response, request } = require('express');
const cotacao = (symbol, callback) => {

  const url = 'https://api.hgbrasil.com/finance/stock_price'
  const params = {
    key: '80edc02a',
    symbol:symbol.toUpperCase()
  }

  axios.get(url,{params}).then(response => {

    const apiResponse = response.data.results[params.symbol];

    if(apiResponse.error){
        throw new error({message: `Bussiness Error: ${apiResponse}`});
    }

    const  {symbol,name,region,currency,price} = apiResponse;
    
    //Atribuição por desestruturação;
    const data = {symbol,name,region,currency,price} ;
    
    //console.log(data);
    callback(data);
  
  }).catch(error => {
    const erro = {
      erro:{
        message: `O ativo informado (${symbol}) não existe.`,
        code: 404
      }
    }
    callback(erro);
      
  });
}

module.exports =  cotacao;