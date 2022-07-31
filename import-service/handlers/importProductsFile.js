"use strict";
import AWS from 'aws-sdk';
import { BUCKET, STATUS_CODES, MESSAGES } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';

export const importProductsFile = lambdaWrapper(async (event) => {
  const s3 = new AWS.S3({ region: 'eu-west-1' });
  // const { name: fileName } = event.queryStringParameters;

  const fileName = 'test'
  if (!fileName) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      body: { message: MESSAGES.INVALID_INPUT },
    }
  }

  const filePath = `uploaded/${fileName}.csv`;

  const params = {
    Bucket: BUCKET,
    Key: filePath,
    Expires: 60,
    ContentType: 'text/csv'
  };

  const signedUrl = await s3.getSignedUrlPromise('putObject', params)
    .then(url => url)
    .catch(e => {
      const errorMessage = `error occured when trying to ${operationName}: ${e}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    })

  return {
    statusCode: STATUS_CODES.OK,
    body: { url: signedUrl }
  }
});
