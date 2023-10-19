# COMSW4156-Project

Columbia Engineering COMS4156 Project

### After Clone

-   Install dependencies and packages

```
npm i
```

-   Start Server in Local Env

```
npm run dev
```

-   Stop Server in Local Env

**Press Ctrl + C**

# Naming

1. to ensure no surprise: file/folder names that are noun-phrases will be in plural forms, e.g. controllers, Users.js ...
   Exception: ./server.js, ./middelwares/error.js, ./helpers/errResponse.js
2. font wise: all in camelCase except for those defined under the `models` directory, which are capitalized.

# Testing

### Mocha Testing Framework

Mocha is a powerful JavaScript testing framework that simplifies the process of writing and running tests for your code.

### Installation

1. **Node.js and npm**: Ensure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

2. **Install Mocha**: Use npm to install Mocha as a development dependency:

   ```shell
   npm install mocha --save-dev
   
### Run Test 1
1. For Middlewares part run at root directory:
   ```
   mocha "middlewares/*.js"
   ```
2. For helpers modules, run at root directory:
   ```
   mocha "helpers/*.js"
   ```
### Run Test 2
1. For folder models and controllers, run at root directory:
   ```
   npm install --save-dev jest
   ```
   run the test:
   ```
   npm test
   ```


   

