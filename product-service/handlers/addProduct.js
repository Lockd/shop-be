"use strict";
import {
  DEFAULT_HEADERS,
  PRODUCT_ADDED_MESSAGE,
  INVALID_INPUT_MESSAGE,
  DB_CONNECTION_ERROR_MESSAGE,
} from "../utils/constants";
import { singleQueryToDb } from "../utils/DbOperations";
import { logger } from "../utils/misc";

export const getResponseForAddProduct = (code, message) => ({
  statusCode: code,
  headers: DEFAULT_HEADERS,
  body: JSON.stringify({
    message: message,
  }),
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

export const addProduct = logger(async (event) => {
  if (!getIsPayloadValid(event.queryStringParameters)) {
    return getResponseForAddProduct(400, INVALID_INPUT_MESSAGE);
  }

  const { title, description, count, price } = event.queryStringParameters;
  try {
    await singleQueryToDb(
      "with rows as (" +
        `insert into product (title, description, price) VALUES ('${title}', '${description}', ${+price}) returning id` +
        ")" +
        `insert into stock (product_id, count) select id, ${+count} from rows`,
      "add new product"
    );
  } catch (e) {
    console.log("error occured while connecting to db", e);
    return getResponseForAddProduct(500, DB_CONNECTION_ERROR_MESSAGE);
  }

  return getResponseForAddProduct(200, PRODUCT_ADDED_MESSAGE);
});
