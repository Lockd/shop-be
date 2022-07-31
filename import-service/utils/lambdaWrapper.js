import { DEFAULT_HEADERS, MESSAGES, STATUS_CODES } from "./constants";

const lambdaWrapper = (handlerCallback) => async (event) => {
  console.log("event object ", event);

  let statusCode;
  let responseBody;

  try {
    const response = await handlerCallback(event);
    statusCode = response.statusCode || STATUS_CODES.OK;
    responseBody = response.body || {};
  } catch (e) {
    console.log("unhandled error occured ", e);
    statusCode = e.statusCode || STATUS_CODES.SERVER_ERROR;
    responseBody = { message: MESSAGES.UNKONWN_ERROR };
  } finally {
    return {
      statusCode: statusCode,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(responseBody),
    };
  }
};

export default lambdaWrapper;
