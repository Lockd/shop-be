"use strict";
const { PRODUCT_LIST } = require('../utils/constants');

module.exports.handler = async (event) => {
  
  console.log('get products function is triggered with following event: ', event)

    return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: JSON.stringify({
      products: PRODUCT_LIST
    })
  };
};
