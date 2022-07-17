import { getResponseWithProductsList } from '../handlers/getProductsList';
import { PRODUCT_LIST } from '../utils/constants';

describe('function response is formed properly', () => {
  const response = getResponseWithProductsList(PRODUCT_LIST);

  it('status code is 200', () => {
    expect(response.statusCode).toBe(200)
  })
  it('body contains stringified list of products', () => {
    expect(response.body).toEqual(JSON.stringify({ products: PRODUCT_LIST }))
  })
})