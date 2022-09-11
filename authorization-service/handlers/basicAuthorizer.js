export const basicAuthorizer = (event, context, callback) => {
  const { type, authorizationToken } = event;

  console.log('event, ', event);

  if (type !== "TOKEN") {
    callback('Unathorized');
  }

  try {
    const creds = authorizationToken.split(" ")[1];
    const buff = Buffer.from(creds, 'base64');
    const plainCreds = buff.toString('utf-8').split(":");
    const [username, password] = plainCreds;

    console.log("username: ", username);
    console.log("password: ", password);

    const storedUserPassword = process.env[username];
    const effect =
      !storedUserPassword || storedUserPassword !== password ? "Deny" : "Allow";
    const policy = generatePolicy(creds, event.methodArn, effect);

    callback(null, policy);

  } catch (e) {
    callback('Unathorized');
  }
};

const generatePolicy = (principalId, resource, effect = "Allow") => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});
