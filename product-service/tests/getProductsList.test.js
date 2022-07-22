import { getResponseWithProductsList } from '../handlers/getProductsList';

const PRODUCT_LIST_MOCK_MOCK = [
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
]

describe('function response is formed properly', () => {
  const response = getResponseWithProductsList(PRODUCT_LIST_MOCK);

  it('status code is 200', () => {
    expect(response.statusCode).toBe(200)
  })
  it('body contains stringified list of products', () => {
    expect(response.body).toEqual(JSON.stringify({ products: PRODUCT_LIST_MOCK }))
  })
})