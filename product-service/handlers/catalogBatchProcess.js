"use strict";
import { MESSAGES, STATUS_CODES, AWS_REGION } from "../utils/constants";
import { addProductQuery } from "../utils/DbOperations";
import lambdaWrapper from "../utils/lambdaWrapper";
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({ region: AWS_REGION })

export const catalogBatchProcess = lambdaWrapper(async (event) => {
  const { Records } = event;
  const { SNS_TOPIC_ARN } = process.env;
  const productsToBeAdded = Records.map(record => JSON.parse(record.body));
  
  for (const product of productsToBeAdded) {
    const { title, description, count, price } = product;
    await addProductQuery({ title, description, count, price });
  }

  const productsString = productsToBeAdded.map(({ title, description, count, price }) => (
    `\n title: ${title}, description: ${description}, count: ${count}, price: ${price}`
  ));

  const snsMessageParams = {
    Message: 'The following products were added: ' + productsString,
    TopicArn: SNS_TOPIC_ARN
  }

  await sns.send(new PublishCommand(snsMessageParams));

  return {
    statusCode: STATUS_CODES.OK,
    body: { message: MESSAGES.PRODUCT_ADDED },
  };
});
