"use strict";
import AWS from 'aws-sdk';
import { BUCKET, STATUS_CODES, AWS_REGION } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';

export const importFileParser = lambdaWrapper(async (event) => {
  const s3 = new AWS.S3({ region: AWS_REGION });

  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key
    }
  
    const s3Stream = s3.getObject(params).createReadStream();
    await s3Stream
      .on('data', data => console.log('data from read stream ', data))
      .on('error', e => {
        const errorMessage = `error occured when trying to ${operationName}: ${e}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      })
      .on('end', () => console.log('file was read succesfully'))

    await s3.copyObject({
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + record.s3.object.key,
      Key: record.s3.object.key.replace('uploaded', 'parsed')
    }).promise();

    await s3.deleteObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).promise();

    console.log('moved ' + record.s3.object.key.split('/')[1])
  }

  return {
    statusCode: STATUS_CODES.OK,
    body: {}
  }
});
