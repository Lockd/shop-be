import { getResponseProductsById } from "../handlers/getProductById";
import { PRODUCT_LIST, PRODUCT_NOT_FOUND_MESSAGE } from '../utils/constants';

describe('response for getProductById is formed properly', () => {
  const productWasNotFoundResponse = getResponseProductsById(undefined);

  it('status code is 404 if product was not found', () => {
    expect(productWasNotFoundResponse.statusCode).toBe(404)
  })
  it('body contains error message if product was not found', () => {
    expect(productWasNotFoundResponse.body).toEqual(JSON.stringify({ message: PRODUCT_NOT_FOUND_MESSAGE }))
  })

  const productWasFoundResponse = getResponseProductsById(PRODUCT_LIST[0])
  it('status code is 200 if product was found', () => {
    expect(productWasFoundResponse.statusCode).toBe(200)
  })
  it('body contains stringified product data if product was found', () => {
    expect(productWasFoundResponse.body).toEqual(JSON.stringify({
      data: PRODUCT_LIST[0]
    }))
  })
})