import { getPriceInEuro, getProductListWithEuroPrices } from '../utils/misc';
import { PRODUCT_LIST } from "../utils/constants";

const MOCK_DATA_PRICE = [
  { price: 1, ratio: 0.9 },
  { price: 17, ratio: 1.3 },
  { price: 14.37, ratio: 1.5 }
];

const MOCK_CONVERSION_RATIO = 3;

describe('price calculation', () => {
  it('price is properly transformed from USD to EUR', () => {
    MOCK_DATA_PRICE.forEach(dataFragment => {
      expect(getPriceInEuro(dataFragment.price, dataFragment.ratio)).toBe(dataFragment.price * dataFragment.ratio)
    })
  })
})

describe('Product data is formed properly', () => {
  const productWithEuroPrices = getProductListWithEuroPrices(MOCK_CONVERSION_RATIO);

  it('Initial product data stays the same', () => {
    productWithEuroPrices.forEach((product, idx) => {
      Object.entries(product).forEach(([fieldKey, fieldValue]) => {
        if (PRODUCT_LIST[idx].hasOwnProperty(fieldKey)) {
          expect(PRODUCT_LIST[idx][fieldKey]).toBe(fieldValue)
        }
      })
    })
  })

  it('Price for each product is properly converted to EUR', () => {
    productWithEuroPrices.forEach((product, idx) => {
      expect(product.priceEUR).toBe(PRODUCT_LIST[idx].priceUSD * MOCK_CONVERSION_RATIO)
    })
  })
})
