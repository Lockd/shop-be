"use strict";
import { DEFAULT_HEADERS } from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";
import { logger } from '../utils/misc'

export const getResponseWithProductsList = (products) => ({
  statusCode: 200,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify({
    products: products,
  }),
});

export const getProductsList = logger(async (event) => {
  const products = await singleQueryToDb(
    "select * from product inner join stock on stock.product_id=product.id",
    'get products list'
  ).catch(e => console.log('error occured while connecting to db', e));

  return getResponseWithProductsList(products);
});
