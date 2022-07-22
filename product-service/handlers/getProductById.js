"use strict";
import { getProductListWithEuroPrices, getUsdToEuroRatio } from '../utils/misc';
import { GET_HEADERS, PRODUCT_NOT_FOUND_MESSAGE } from '../utils/constants';

export const getResponseProductsById = (searchResult) => {
  if (!searchResult) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: PRODUCT_NOT_FOUND_MESSAGE
      }),
      headers: GET_HEADERS
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: searchResult
    }),
    headers: GET_HEADERS
  }
}

export const getProductById = async (event) => {
  const id = event.path.split('products/')[1] || '';
  const usdToEuroRatio = await getUsdToEuroRatio();
  const productsList = await getProductListWithEuroPrices(usdToEuroRatio);
  const searchResult = productsList.find(el => el.id === id);
  
  return getResponseProductsById(searchResult);
};
