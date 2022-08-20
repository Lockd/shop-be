"use strict";
import { BUCKET, STATUS_CODES } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';
import { getObject, deleteObject, copyObject } from '../s3';

export const importFileParser = lambdaWrapper(async (event) => {
  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key
    }
  
    const { Body: csvStream } = await getObject(params);

    await csvStream
      .on('data', data => console.log('data from read stream ', data))
      .on('error', e => {
        const errorMessage = `error occured when trying to ${operationName}: ${e}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      })
      .on('end', () => console.log('file was read succesfully'))

    await copyObject({
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + record.s3.object.key,
      Key: record.s3.object.key.replace('uploaded', 'parsed')
    });

    await deleteObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    });

    console.log('moved ' + record.s3.object.key.split('/')[1])
  }

  return {
    statusCode: STATUS_CODES.OK,
    body: {}
  }
});
