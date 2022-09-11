"use strict";
import { BUCKET, STATUS_CODES, AWS_REGION } from '../utils/constants';
import lambdaWrapper from '../utils/lambdaWrapper';
import { getObject, deleteObject, copyObject } from '../s3';
import csv from 'csv-parser';
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({ region: AWS_REGION });

export const importFileParser = lambdaWrapper(async (event) => {
  const { SQS_QUEUE_URL } = process.env;

  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET,
      Key: record.s3.object.key
    }
  
    const { Body: csvStream } = await getObject(params);

    await csvStream
      .pipe(csv())
      .on('data', async (data) => {
        const sqsRequest = {
          QueueUrl: SQS_QUEUE_URL,
          MessageBody: JSON.stringify(data),
        };
        await sqs.send(new SendMessageCommand(sqsRequest));
      })
      .on('error', e => {
        const errorMessage = `error occured when trying to ${operationName}: ${e}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      });

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
