"use strict";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";
import lambdaWrapper from "../utils/lambdaWrapper";

export const getResponseForAddProduct = (code, message) => ({
  statusCode: code,
  body: { message: message },
});

export const getIsPayloadValid = ({ title, description, count, price }) => {
  if (
    !typeof title === "string" ||
    !typeof description === "string" ||
    !Number.isInteger(+price) ||
    !Number.isInteger(+count)
  ) {
    return false;
  }
  return true;
};

export const addProduct = lambdaWrapper(async (event) => {
  if (!getIsPayloadValid(event.queryStringParameters)) {
    return getResponseForAddProduct(
      STATUS_CODES.BAD_REQUEST,
      MESSAGES.INVALID_INPUT
    );
  }

  const { title, description, count, price } = event.queryStringParameters;

  await singleQueryToDb(
    "with rows as (" +
      `insert into product (title, description, price) VALUES ('${title}', '${description}', ${+price}) returning id` +
      ")" +
      `insert into stock (product_id, count) select id, ${+count} from rows`,
    "add new product"
  );

  return getResponseForAddProduct(STATUS_CODES.OK, MESSAGES.PRODUCT_ADDED);
});
