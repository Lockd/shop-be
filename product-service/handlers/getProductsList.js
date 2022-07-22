"use strict";
import { getProductListWithEuroPrices, getUsdToEuroRatio } from "../utils/misc";
import { GET_HEADERS } from "../utils/constants";

export const getResponseWithProductsList = (products) => ({
  statusCode: 200,
  headers: GET_HEADERS,
  body: JSON.stringify({
    products: products,
  }),
});

export const getProductsList = async (event) => {
  const usdToEuroRatio = await getUsdToEuroRatio();
  const productsWithEuroPrices = await getProductListWithEuroPrices(usdToEuroRatio);

  return getResponseWithProductsList(productsWithEuroPrices);
};
