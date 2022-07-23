"use strict";
import { GET_HEADERS } from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";

export const getResponseWithProductsList = (products) => ({
  statusCode: 200,
  headers: GET_HEADERS,
  body: JSON.stringify({
    products: products,
  }),
});

export const getProductsList = async (event) => {
  console.log('event object for getProductsList ', event);

  const products = await singleQueryToDb(
    "select * from product inner join stock on stock.product_id=product.id",
    'get products list'
  ).catch(e => console.log('error occured while connecting to db', e));

  return getResponseWithProductsList(products);
};
