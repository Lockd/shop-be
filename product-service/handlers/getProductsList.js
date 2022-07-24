"use strict";
import { singleQueryToDb } from "../utils/DbOperations";
import { STATUS_CODES } from "../utils/constants";
import lambdaWrapper from '../utils/lambdaWrapper';

export const getProductsList = lambdaWrapper(async (event) => {
  const products = await singleQueryToDb(
    "select * from product inner join stock on stock.product_id=product.id",
    'get products list'
  )

  return {
    statusCode: STATUS_CODES.OK,
    body: {
      products
    }
  };
});
