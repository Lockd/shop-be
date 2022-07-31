# shop-be
Backend for node JS + AWS course application

# Task 5
## Main tasks
✅ File serverless.yml contains configuration for importProductsFile function  
✅ The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket  
✅ Frontend application is integrated with importProductsFile lambda  
✅ The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda  

Frontend can be checked here - https://dhze4aixe37ki.cloudfront.net/admin/products
Frontend pr - https://github.com/Lockd/shop-react-redux-cloudfront/pull/3

## Additional (optional) tasks
✅ async/await is used in lambda functions  
✅ importProductsFile lambda is covered by unit tests
✅ At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into a new folder in the same bucket called parsed, and then deleted from uploaded folder)  