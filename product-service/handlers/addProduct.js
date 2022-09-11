"use strict";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import { singleQueryToDb, addProductQuery } from "../utils/DbOperations";
import lambdaWrapper from "../utils/lambdaWrapper";

export const getResponseForAddProduct = (code, message) => ({
  statusCode: code,
  body: { message: message },
});

export const getIsPayloadValid = ({ title, description, count, price }) => {
  if (
    !typeof title === "string" ||
    !typeof description === "string" ||
    !title.length ||
    !Number.isInteger(+price) ||
    !Number.isInteger(+count) ||
    +price < 0 ||
    +count < 0
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

  await addProductQuery({ title, description, count, price});

  return getResponseForAddProduct(STATUS_CODES.OK, MESSAGES.PRODUCT_ADDED);
});
