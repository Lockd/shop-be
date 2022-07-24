# shop-be
 Backend for node JS + AWS course application

# Task 4
## Main tasks
Implemented functions:
- getProductsList - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products
- getProductById - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa  
- error for getProductById - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products/any-other-string 
- add new product POST request - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products?title=test-title&description=test-description&count=12&price=38
- frontend implementation can be seen here https://dhze4aixe37ki.cloudfront.net/  

## Additional tasks
- event object is logged for each function
- POST /products lambda functions returns error 400 status code if product data is invalid
- Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa). Since this request is implemented as singular SQL command it can not be finished partially: if one part fails second will not be executed and vice versa


## Not finished 
- All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)