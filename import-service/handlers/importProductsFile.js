"use strict";
import AWS from 'aws-sdk';
import { BUCKET, STATUS_CODES, MESSAGES, AWS_REGION } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';

export const importProductsFile = lambdaWrapper(async (event) => {
  const s3 = new AWS.S3({ region: AWS_REGION });
  const { name: fileName } = event.queryStringParameters;

  if (!fileName) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      body: { message: MESSAGES.INVALID_INPUT },
    }
  }

  const filePath = 'uploaded/' + fileName;

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
  };
});
