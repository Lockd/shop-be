"use strict";
const { PRODUCT_LIST } = require('../utils/constants');

module.exports.handler = async (event) => {
  const id = event.path.split('products/')[1] || '';
  const searchResult = PRODUCT_LIST.find(el => el.id === id);
  
  let responseBody = {};
  if (searchResult) {
    responseBody.data = searchResult;
  } else {
    responseBody.message = 'Sorry, we were not able to find this item';
  }
  
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify(responseBody),
  };
};
