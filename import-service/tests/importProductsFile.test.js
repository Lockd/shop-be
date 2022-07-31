import { importProductsFile } from "../handlers/importProductsFile";
import { MESSAGES, STATUS_CODES } from "../utils/constants";
import AWS from 'aws-sdk-mock';

const FAILURE_EVENT = { queryStringParameters: {} };
const SUCCESS_EVENT = { queryStringParameters: { name: 'some-file.csv' }};
const MOCK_URL = 'https://example.com';

describe("Get product list function", () => {
  it("should return 400 status if file name is not passed", async () => {
    const response = await importProductsFile(FAILURE_EVENT);

    expect(response.statusCode).toBe(STATUS_CODES.BAD_REQUEST);
    expect(JSON.parse(response.body).message).toEqual(MESSAGES.INVALID_INPUT);
  });
  it("should return 200 if file name is passed as param", async () => {
    AWS.mock('S3', 'getSignedUrl', MOCK_URL);

    const response = await importProductsFile(SUCCESS_EVENT);

    expect(response.statusCode).toBe(STATUS_CODES.OK);
    expect(JSON.parse(response.body).url).toEqual(MOCK_URL);
  });
});
