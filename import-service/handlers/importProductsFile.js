"use strict";
import { BUCKET, STATUS_CODES, MESSAGES, AWS_REGION } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../s3';

export const importProductsFile = lambdaWrapper(async (event) => {
  const { name: fileName } = event.queryStringParameters;

  if (!fileName) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      body: { message: MESSAGES.INVALID_INPUT },
    }
  }

  const filePath = 'uploaded/' + fileName;

  try {
    const importFile = new PutObjectCommand({
      Bucket: BUCKET,
      Key: filePath,
      ContentType: 'text/csv'
    });
    const signedUrl = await getSignedUrl(
      s3Client,
      importFile,
      { expiresIn: 60 }
    );

    return {
      statusCode: STATUS_CODES.OK,
      body: { url: signedUrl }
    };
  } catch(e) {
    const errorMessage = `error occured when trying to ${operationName}: ${e}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
});
