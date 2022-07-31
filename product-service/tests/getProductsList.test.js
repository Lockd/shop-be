import { getProductsList } from '../handlers/getProductsList';
import { STATUS_CODES } from '../utils/constants';
import * as dbOperations from '../utils/DbOperations';
import { PRODUCT_LIST_MOCK } from '../utils/constants';
jest.mock('../utils/DbOperations');

describe('Get product list function', () => {
  it('should return 200 status', async () => {
    (dbOperations.singleQueryToDb).mockImplementation(
      () => Promise.resolve(PRODUCT_LIST_MOCK)
    )
    const response = await getProductsList({});

    console.log('response', response)

    expect(dbOperations.singleQueryToDb).toBeCalled();
    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(JSON.parse(response.body).products).toEqual(PRODUCT_LIST_MOCK);
  })
})
