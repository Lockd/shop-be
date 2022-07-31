import { addProduct, getIsPayloadValid } from '../handlers/addProduct';
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import * as dbOperations from "../utils/DbOperations";
jest.mock("../utils/DbOperations");

const MOCK_PAYLOAD = [
  {
    title: 'mock-title',
    description: 'mock-description',
    count: '13',
    price: '17',
    expectedResult: true
  },
  {
    title: 'mock-title',
    description: '',
    count: '13',
    price: '17',
    expectedResult: true
  },
  {
    title: '',
    description: 'mock-description',
    count: '13',
    price: '17',
    expectedResult: false
  },
  {
    title: 'mock-title',
    description: 'mock-description',
    count: '13letter',
    price: '17',
    expectedResult: false
  },
  {
    title: 'mock-title',
    description: 'mock-description',
    count: '13',
    price: '17letter',
    expectedResult: false
  }
]

describe('Validating input', () => {
  MOCK_PAYLOAD.forEach((payload, idx) => {
    it(`payload with index ${idx} should result in ${payload.expectedResult}`, () => {
      expect(getIsPayloadValid(payload)).toBe(payload.expectedResult)
    })
  })
});

const EVENT_WITH_INVALID_INPUT = {
  queryStringParameters: {
    ...MOCK_PAYLOAD[2]
  }
}

const EVENT_WITH_VALID_INPUT = {
  queryStringParameters: {
    ...MOCK_PAYLOAD[0]
  }
}

describe('Add product function', () => {
  it('should return 400 status if payload is invalid', async () => {
    const response = await addProduct(EVENT_WITH_INVALID_INPUT);

    expect(dbOperations.singleQueryToDb).not.toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(JSON.parse(response.body).message).toEqual(MESSAGES.INVALID_INPUT)
  })

  it('should return 200 status if payload is valid', async () => {
    const response = await addProduct(EVENT_WITH_VALID_INPUT);

    (dbOperations.singleQueryToDb).mockImplementation(
      () => Promise.resolve({})
    )

    expect(dbOperations.singleQueryToDb).toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(JSON.parse(response.body).message).toEqual(MESSAGES.PRODUCT_ADDED)
  })
});
