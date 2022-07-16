"use strict";
import { getProductListWithEuroPrices } from '../utils/misc'

export const handler = async (event) => {

  const productsWithEuroPrices = await getProductListWithEuroPrices();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({
      products: productsWithEuroPrices
    }),
  };
};
