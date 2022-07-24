"use strict";
import { DEFAULT_HEADERS, PRODUCT_NOT_FOUND_MESSAGE } from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";

export const getResponseProductsById = (searchResult) => {
  if (!searchResult || !searchResult?.length) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: PRODUCT_NOT_FOUND_MESSAGE,
      }),
      headers: DEFAULT_HEADERS,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: searchResult,
    }),
    headers: DEFAULT_HEADERS,
  };
};

export const getProductById = async (event) => {
  console.log('event object for getProductById ', event);
  const { productId } = event.pathParameters;
  const searchResult = await singleQueryToDb(
    'select p.id, p.title, p.description, p.price, s.count from product as p ' +
    `inner join "stock" as s on p.id = s.product_id and p.id = '${productId}'`,
    'get product by id'
  );

  return getResponseProductsById(searchResult);
};
