export const DEFAULT_HEADERS = {
  "Access-Control-Allow-Headers" : "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET"
};

export const MESSAGES = {
  PRODUCT_NOT_FOUND: 'Sorry, we were not able to find this item',
  PRODUCT_ADDED: 'Product is succesfully added',
  INVALID_INPUT: 'Invalid payload',
  DB_CONNECTION_ERROR: 'Error occured while working with database',
  UNKONWN_ERROR: 'Unknown error occured', 
};

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};