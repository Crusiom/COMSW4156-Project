# COMSW4156-Project

Columbia Engineering COMS4156 Project
## Setup (Build & Run instructions)
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

## API Documentation


## Naming

1. to ensure no surprise: file/folder names that are noun-phrases will be in plural forms, e.g. controllers, Users.js ...
   Exception: ./server.js, ./middelwares/error.js, ./helpers/errResponse.js
2. font wise: all in camelCase except for those defined under the `models` directory, which are capitalized.
   
## 	Style Compliant
To run the style checker:
```
node format-checker.js
```
A sample report by running the style checker is: 
```
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/middlewares/advancedResults.test.js--------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/middlewares/appChecker.test.js-------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/middlewares/async.test.js------------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/middlewares/auth.test.js-------------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfilesindirectory:tests/models-------------------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/models/Apps.test.js------------------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/models/Events.test.js----------------------------
[INFO]---2023-10-19T21:18:46Z---Checkingfile:tests/models/Users.test.js-----------------------------
[INFO]---2023-10-19T21:18:46Z---Youhave0formaterrors------------------------------------------------
[INFO]---2023-10-19T21:18:46Z---BUILDSUCCESS--------------------------------------------------------
[INFO]---2023-10-19T21:18:46Z---Totaltime:0.139s----------------------------------------------------
[INFO]---2023-10-19T21:18:46Z---Finishedat:2023-10-19T21:18:46Z-------------------------------------
```
## System Tests Corresponding to API

Utilized Postman for testing. Refer to Test.postman_collection.json for the test collection.

## Unit Tests (test instruction)
- The project includes a structured unit testing framework to ensure code correctness and reliability. Unit tests are organized and can be executed with a single command.
- All tests for our code are in the /tests directory, run at root directory:
```
.
├── controllers
│   ├── app.test.js
│   ├── auth.test.js
│   ├── event.test.js
│   └── users.test.js
├── helpers
│   └── errResponse.test.js
├── middlewares
│   ├── advancedResults.test.js
│   ├── appChecker.test.js
│   ├── async.test.js
│   └── auth.test.js
└── models
    ├── Apps.test.js
    ├── Events.test.js
    └── Users.test.js
```
- To run the test: ```npm test```
- Setup ```npm i```
- To teardown temporary files: ```rmdir /s /q node modules```
