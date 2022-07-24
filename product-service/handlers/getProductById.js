"use strict";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";
import lambdaWrapper from '../utils/lambdaWrapper';

export const getResponseProductsById = (searchResult) => {
  if (!searchResult || !searchResult?.length) {
    return {
      statusCode: STATUS_CODES.NOT_FOUND,
      body: { message: MESSAGES.PRODUCT_NOT_FOUND },
    };
  }

  return {
    statusCode: STATUS_CODES.OK,
    body: { data: searchResult },
  };
};

export const getProductById = lambdaWrapper(async (event) => {
  const { productId } = event.pathParameters;
  const searchResult = await singleQueryToDb(
    'select p.id, p.title, p.description, p.price, s.count from product as p ' +
    `inner join "stock" as s on p.id = s.product_id and p.id = '${productId}'`,
    'get product by id'
  );

  return getResponseProductsById(searchResult);
});
