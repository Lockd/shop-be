export const BUCKET = "s3-serverless-integration";

export const DEFAULT_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET",
};

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const MESSAGES = {
  INVALID_INPUT: 'Invalid payload',
  UNKONWN_ERROR: 'Unknown error occured', 
};
