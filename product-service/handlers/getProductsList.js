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
  const products = await singleQueryToDb("select * from product inner join stock on stock.product_id=product.id");

  return getResponseWithProductsList(products);
};
