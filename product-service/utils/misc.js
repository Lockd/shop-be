import axios from 'axios';
import { API_EXCHANGE_BASE_URL, PRODUCT_LIST } from './constants';

export const getUsdToEuroRatio = async () => {
  const headers = {
    'apikey': process.env.EXCHANGE_API_KEY
  }
  const ratio = await axios.get(`${API_EXCHANGE_BASE_URL}/latest?base=USD&symbols=EUR`, { headers })
    .then(response => {
      console.log(response);
      return response.data.rates['EUR']
    });
  return ratio;
}

export const getPriceInEuro = (usdPrice, ratio) => usdPrice * ratio

export const getProductListWithEuroPrices = (usdToEuroRatio) => {
  const productListWithEuroPrices = PRODUCT_LIST.map(el => {
    return {
      ...el,
      priceEUR: getPriceInEuro(el.priceUSD, usdToEuroRatio)
    }
  });

  return productListWithEuroPrices;
}