# shop-be
 Backend for node JS + AWS course application

## Main tasks
Implemented functions:
- getProductsList - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products
- getProductById - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa  
- error for getProductById - https://z1tvhyxaxg.execute-api.eu-west-1.amazonaws.com/dev/products/any-other-string  

## Additional tasks
- swagger documentation https://app.swaggerhub.com/apis/PIKAGRIGORIY/swagger-for_pottery_shop/1.0.0  
- Lambda handlers (getProductsList, getProductsById) code is written not in 1 single module (file) and separated in codebase.
- Main error scenarios are handled by API (product not found example)
- Async/await is used to determine item price in euros. Base price is speicified in USD
- Webpack is configured
- ES6 modules are supported and used

## Not done yet
+1 - unit tests