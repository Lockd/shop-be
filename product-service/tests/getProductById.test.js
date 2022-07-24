import { getProductById } from "../handlers/getProductById";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import * as dbOperations from "../utils/DbOperations";
import { PRODUCT_LIST_MOCK } from '../utils/constants';
jest.mock("../utils/DbOperations");

const PRODUCT_ID = "7567ec4b-b10c-48c5-9345-fc73c48a80a2";

const SUCCESS_EVENT_MOCK = {
  pathParameters: {
    productId: PRODUCT_ID,
  },
};
const FAIL_EVENT_INCORRECT_UUID_MOCK = {
  pathParameters: {
    productId: 'qwee',
  },
};
const FAIL_EVENT_CORRECT_UUID_MOCK = {
  pathParameters: {
    productId: '7567ec4b-b10c-48c5-9345-fc73c48a80a4',
  },
};

describe("Get product list function", () => {
  it("should return 200 status if product exists", async () => {
    const productToBeFound = PRODUCT_LIST_MOCK.filter(el => el.id === PRODUCT_ID);
    
    dbOperations.singleQueryToDb.mockImplementation(() =>
      Promise.resolve(productToBeFound)
    );
    const response = await getProductById(SUCCESS_EVENT_MOCK);

    expect(dbOperations.singleQueryToDb).toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(JSON.parse(response.body).data).toEqual(productToBeFound);
  });

  it('should return 404 status if product is not found (wrong uuid)', async () => {
    dbOperations.singleQueryToDb.mockImplementation(() =>
      Promise.resolve([])
    );
    const response = await getProductById(FAIL_EVENT_INCORRECT_UUID_MOCK);

    expect(dbOperations.singleQueryToDb).toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(JSON.parse(response.body).message).toEqual(MESSAGES.PRODUCT_NOT_FOUND);
  });

  it('should return 404 status if product is not found (correct uuid)', async () => {
    dbOperations.singleQueryToDb.mockImplementation(() =>
      Promise.resolve([])
    );
    const response = await getProductById(FAIL_EVENT_CORRECT_UUID_MOCK);

    expect(dbOperations.singleQueryToDb).toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.NOT_FOUND);
    expect(JSON.parse(response.body).message).toEqual(MESSAGES.PRODUCT_NOT_FOUND);
  });
});
