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

## System

## Naming

1. to ensure no surprise: file/folder names that are noun-phrases will be in plural forms, e.g. controllers, Users.js ...
   Exception: ./server.js, ./middelwares/error.js, ./helpers/errResponse.js
2. font wise: all in camelCase except for those defined under the `models` directory, which are capitalized.

## Style Compliant

## Testing

-   The project includes a structured unit testing framework to ensure code correctness and reliability. Unit tests are organized and can be executed with a single command.
-   All tests for our code are in the /tests directory, run at root directory:

```````
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
### Unit Testing
- To run the test: ```npm test```
- Setup ```npm i```
- To teardown temporary files: ```rmdir /s /q node modules```

### Run Branch Coverage in Jest
- To see the current unit test coverage, run: ```npm test -- --coverage``````


## API Endpoints

**App**
- `POST /createApp`
  - Description:
    Create a new application
  - Response Codes:
    - ```200: Success```
    - ```400: Missing title for the application```
    - ```401: Not authorized to create an application```

- `POST /api/v1/apps/:id`
  - Description:
    Update an existing application
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```201: Success```
    - ```401: Not authorized to update an application```
    - ```404: Resource not found```

**Auth**
- `POST /api/v1/auth/register`
  - Description:
    Register a user that comes with a certain role and a certain end-application
  - Request Body:
    - `name:string`
    - `email:string`
    - `password:string`
    - `app:string`
    - `role:string`
  - Response Codes:
    - ```200: Success```
    - ```400: User with this email already exists```

- `POST /api/v1/auth/login`
  - Description:
    Login a user (which could be a publisher or a end-user)
  - Request Body:
    - `email:string`
    - `password:string`
  - Response Codes:
    - ```200: Success```
    - ```400: Missing email and/or password```
    - ```401: Invalid Credentialss```

- `GET /api/v1/auth/logout`
  - Description:
    Log a user out and clear cookies
  - Response Codes:
    - ```200: Success```

- `GET /api/v1/auth/me`
  - Description:
    Retrieves the details of the currently authenticated user
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```200: Success```
    - ```401: Not authorized to get users```
    - ```404: Cannot get the user(s)```

**Event**
- `POST /api/v1/events`
  - Description:
    Create a new event that falls under a certain application. e.x. a therapy session of a medicare app.
  - Request Body:
    - `id:string`
    - `app:string`
  - Response Codes:
    - ```200: Success```
    - ```400: Unexpected json syntax in request body```
    - ```401: Not authorized to create events```

- `PUT /api/v1/events/:id`
  - Description:
    Update an existing event that falls under a certain application.
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```201: Success```
    - ```401: Not authorized to update events```
    - ```404: Resource not found```

- `PUT /api/v1/events/:id`
  - Description:
    Delete an existing event that falls under a certain application.
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```200: Success```
    - ```401: Not authorized to delete events```
    - ```404: Resource not found```

- `GET /api/v1/events`
  - Description:
    Get a list of all events that fall under the current application
  - Request Body:
    - `app:string`
  - Response Codes:
    - ```200: Success```
    - ```401: Not authorized to get events```

**Users**

- `GET /api/v1/users`
  - Description:
    Get all user profiles (the data fields other than name/email/passwords)
  - Response Codes:
    - ```200: Success```
    - ```404: Invalid Input```

- `GET /api/v1/users/:id`
  - Description:
    Get a single user profile (the data fields other than name/email/passwords)
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```200: Success```
    - ```404: Invalid Input```

- `POST /api/v1/users`
  - Description:
     Create user's profile, which are the data fields other than name/email/passwords
  - Request Body:
    - `id:string`
    - `name:string`
    - `email:string`
    - `password:string`
    - `app:string`
    - `role:string`
    - `other fields:string`
  - Response Codes:
    - ```200: Success```
    - ```404: Resource not found```

- `PUT /api/v1/users/:id`
  - Description:
    Update user's profile (update a field other than name/email/passwords)
  - Request Body:
    - `id:string`
    - `name:string`
    - `email:string`
    - `password:string`
    - `app:string`
    - `role:string`
    - `other fields:string`
  - Response Codes:
    - ```201: Success```
    - ```400: password is shorter than the minimum allowed length (6)```
    - ```404: Resource not found```

- `DELETE /api/v1/users`
  - Description:
    Delete user's profile
  - Request Body:
    - `id:string`
  - Response Codes:
    - ```200: Success```
    - ```404: Resource not found```



```````
