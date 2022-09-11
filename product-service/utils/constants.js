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

// this is needed for testing
export const PRODUCT_LIST_MOCK = [
  {
    count: 1,
    description: "Handmade clay pot covered in blue glossy glaze",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 17,
    title: "Clay pot",
  },
  {
    count: 1,
    description: "Handmade bear statuette, a bit sloppy",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    price: 28,
    title: "Bear statuette",
  },
  {
    count: 1,
    description:
      "Huge bowl made of clay with volume of 1.5 liters. Eating out of this vessel will definately help you gain weight",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    price: 32,
    title: "Clay bowl ha-ha u fat",
  },
];

export const AWS_REGION = 'eu-west-1';