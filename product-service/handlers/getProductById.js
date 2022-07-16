"use strict";
import { getProductListWithEuroPrices } from '../utils/misc'

export const handler = async (event) => {
  const id = event.path.split('products/')[1] || '';
  const productsList = await getProductListWithEuroPrices();
  const searchResult = productsList.find(el => el.id === id);
  
  let responseBody = {};
  let statusCode = 200;
  if (searchResult) {
    responseBody.data = searchResult;
  } else {
    responseBody.message = 'Sorry, we were not able to find this item';
    statusCode = 404;
  }
  
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(responseBody),
  };
};
