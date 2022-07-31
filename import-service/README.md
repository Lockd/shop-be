✅ Task 5.1
Create a new service called import-service at the same level as Product Service with a its own serverless.yml file. The backend project structure should look like this:
   backend-repository
      product-service
      import-service
In the AWS Console create and configure a new S3 bucket with a folder called uploaded.

✅ Task 5.2
Create a lambda function called importProductsFile under the same Serverless config file (i.e. serverless.yaml) of the Import Service which will be triggered by the HTTP GET method.
The requested URL should be /import.
Implement its logic so it will be expecting a request with a name of CSV file with products and creating a new Signed URL with the following key: uploaded/${fileName}.
The name will be passed in a query string as a name parameter and should be described in the serverless.yml file as a request parameter.
Update serverless.yml with policies to allow lambda functions to interact with S3.
The response from the lambda should be the created Signed URL.
The lambda endpoint should be integrated with the frontend by updating import property of the API paths configuration.

Task 5.3
Create a lambda function called importFileParser under the same serverless.yml file which will be triggered by an S3 event.
The event should be s3:ObjectCreated:*
Configure the event to be fired only by changes in the uploaded folder in S3.
The lambda function should use a readable stream to get an object from S3, parse it using csv-parser package and log each record to be shown in CloudWatch.
The response should be a correct HTTP response code.

Task 5.4
Commit all your work to separate branch (e.g. task-5 from the latest master) in your own repository.
Create a pull request to the master branch.
Submit link to the pull request to Crosscheck page in RS App.
Evaluation criteria (each mark includes previous mark criteria)
Reviewers should verify the lambda functions by invoking them through provided URLs.

✅ 1 - File serverless.yml contains configuration for importProductsFile function
✅ 3 - The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
4 - Frontend application is integrated with importProductsFile lambda
5 - The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda

Additional (optional) tasks
✅ +1 (for JS only) - async/await is used in lambda functions
+1 (All languages) - importProductsFile lambda is covered by unit tests. (for JS only) aws-sdk-mock can be used to mock S3 methods
+1 (All languages) - At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called parsed, and then deleted from uploaded folder)