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

## Third Party Code

This project does not use any third-party code.

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

### Unit Testing

-   To run the test: `npm test`
-   Setup `npm i`
-   To teardown temporary files: `rmdir /s /q node modules`

### Run Branch Coverage in Jest

-   To see the current unit test coverage, run: `npm test -- --coverage`
-   Test Result:
    -   Controllers Module Branch Coverage: 72.22%
    -   Middlewares Module Branch Coverage: 100%
    -   Helper Module Branch Coverage: 100%
    -   Models Module Branch Coverage: 50%
    -   Overall: 86.36%
        <img width="628" alt="Screenshot 2023-11-30 at 2 56 52 PM" src="https://github.com/Crusiom/COMSW4156-Project/assets/73783044/3ff71fc5-502f-4515-8c9b-75880d464ddd">

### External Integration Tests

-   This project does not use any third-party libraries or databases.

### Internal Integration Tests

The tests are in tests/Integration_tests.

-   App Management Tests (`app_management.integration.test.js`)

    -   Covers CRUD operations for app management, ensuring correct HTTP responses.

-   Authentication Tests (`userauth.integration.test.js`)

    -   Validates new app creation, user registration, and handling of invalid data.

-   Event Management Tests (`event_management.integration.test.js`)

    -   Ensures proper event lifecycle management, from creation to deletion.

-   Middleware & Model Tests (`middleware_model.integration.test.js`)

    -   Tests pagination middleware with mocked user data for proper functionality.

-   User Profile Tests (`user_profile_management.integration.test.js`)

    -   Focuses on user profile operations, including updates and handling invalid IDs.

-   Auth Integration Tests (`auth.integration.test.js`)

    -   Simulates registration and login, focusing on token issuance and error handling.

-   Event Visibility Integration Tests (`event_visib.integration.test.js`)
    -   Simulate a user creating an event and a different user subsequently viewing the event list.

### Bug Finder

-   This project uses ESLint as our static analysis tool to check the entire codebase for syntax errors, and potential bugs, and to enforce a consistent code style. This helps maintain code quality and readability.
-   The bug finder is integrated ESLint into our Continuous Integration (CI) pipeline. (in workflows/eslint.yml)
-   Test Results: all tests passed.

### End-to-End Testing

## API Endpoints

**App**

-   `POST /createApp`

    -   Description:
        Create a new application
    -   Response Codes:
        -   `200: Success`
        -   `400: Missing title for the application`
        -   `401: Not authorized to create an application`

-   `POST /api/v1/apps/:id`
    -   Description:
        Update an existing application
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `201: Success`
        -   `401: Not authorized to update an application`
        -   `404: Resource not found`

**Auth**

-   `POST /api/v1/auth/register`

    -   Description:
        Register a user that comes with a certain role and a certain end-application
    -   Request Body:
        -   `name:string`
        -   `email:string`
        -   `password:string`
        -   `app:string`
        -   `role:string`
    -   Response Codes:
        -   `200: Success`
        -   `400: User with this email already exists`

-   `POST /api/v1/auth/login`

    -   Description:
        Login a user (which could be a publisher or a end-user)
    -   Request Body:
        -   `email:string`
        -   `password:string`
    -   Response Codes:
        -   `200: Success`
        -   `400: Missing email and/or password`
        -   `401: Invalid Credentialss`

-   `GET /api/v1/auth/logout`

    -   Description:
        Log a user out and clear cookies
    -   Response Codes:
        -   `200: Success`

-   `GET /api/v1/auth/me`
    -   Description:
        Retrieves the details of the currently authenticated user
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `200: Success`
        -   `401: Not authorized to get users`
        -   `404: Cannot get the user(s)`

**Event**

-   `POST /api/v1/events`

    -   Description:
        Create a new event that falls under a certain application. e.x. a therapy session of a medicare app.
    -   Request Body:
        -   `id:string`
        -   `app:string`
    -   Response Codes:
        -   `200: Success`
        -   `400: Unexpected json syntax in request body`
        -   `401: Not authorized to create events`

-   `PUT /api/v1/events/:id`

    -   Description:
        Update an existing event that falls under a certain application.
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `201: Success`
        -   `401: Not authorized to update events`
        -   `404: Resource not found`

-   `PUT /api/v1/events/:id`

    -   Description:
        Delete an existing event that falls under a certain application.
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `200: Success`
        -   `401: Not authorized to delete events`
        -   `404: Resource not found`

-   `GET /api/v1/events`
    -   Description:
        Get a list of all events that fall under the current application
    -   Request Body:
        -   `app:string`
    -   Response Codes:
        -   `200: Success`
        -   `401: Not authorized to get events`

**Review**

-   `GET /api/v1/reviews`

    -   Description:
        Get a list of all reviews that fall under the current event of the user
    -   Request Headers:
        -   `Authorizatoin: string starting with 'Bearer'`
    -   Response Codes:
        -   `200: Success`
        -   `401: Not authorized to get events`

-   `POST /api/v1/reviews`

    -   Description:
        Create a new review that falls under a certain event. e.x. a therapy event of a medicare app.
    -   Request Headers:
        -   `Authorizatoin: string starting with 'Bearer'`
    -   Request Body:
        -   `title:string`
        -   `author:string`
        -   `content:string`
        -   `event:string`
        -   `CreatedAt: DateTime`
    -   Response Codes:
        -   `200: Success`
        -   `400: Unexpected json syntax in request body`
        -   `401: Not authorized to create reviews`

-   `PUT /api/v1/reviews/:id`

    -   Description:
        Update an existing review that falls under a certain event.
    -   Request Params:
        -   `id:string`
    -   Request Headers:
        -   `Authorizatoin: string starting with 'Bearer'`
    -   Request Body:
        -   `title:string`
        -   `author:string`
        -   `content:string`
        -   `event:string`
        -   `CreatedAt: DateTime`
    -   Response Codes:
        -   `201: Success`
        -   `401: Not authorized to update reviews`
        -   `404: Resource not found`

-   `PUT /api/v1/reviews/:id`
    -   Description:
        Delete an existing review that falls under a certain event.
    -   Request Params:
        -   `id:string`
    -   Request Headers:
        -   `Authorizatoin: string starting with 'Bearer'`
    -   Request Body:
        -   `title:string`
        -   `author:string`
        -   `content:string`
        -   `event:string`
        -   `CreatedAt: DateTime`
    -   Response Codes:
        -   `200: Success`
        -   `401: Not authorized to delete reviews`
        -   `404: Resource not found`

**Users**

-   `GET /api/v1/users`

    -   Description:
        Get all user profiles (the data fields other than name/email/passwords)
    -   Response Codes:
        -   `200: Success`
        -   `404: Invalid Input`

-   `GET /api/v1/users/:id`

    -   Description:
        Get a single user profile (the data fields other than name/email/passwords)
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `200: Success`
        -   `404: Invalid Input`

-   `POST /api/v1/users`

    -   Description:
        Create user's profile, which are the data fields other than name/email/passwords
    -   Request Body:
        -   `id:string`
        -   `name:string`
        -   `email:string`
        -   `password:string`
        -   `app:string`
        -   `role:string`
        -   `other fields:string`
    -   Response Codes:
        -   `200: Success`
        -   `404: Resource not found`

-   `PUT /api/v1/users/:id`

    -   Description:
        Update user's profile (update a field other than name/email/passwords)
    -   Request Body:
        -   `id:string`
        -   `name:string`
        -   `email:string`
        -   `password:string`
        -   `app:string`
        -   `role:string`
        -   `other fields:string`
    -   Response Codes:
        -   `201: Success`
        -   `400: password is shorter than the minimum allowed length (6)`
        -   `404: Resource not found`

-   `DELETE /api/v1/users`
    -   Description:
        Delete user's profile
    -   Request Body:
        -   `id:string`
    -   Response Codes:
        -   `200: Success`
        -   `404: Resource not found`

```

## Target User & Clients

Our service can be used for clients from medical field:

### Target Users

Our service and two client applications aim to cater to two distinct user groups:

- **Health Discussion Platform:**

  - Target Users: Patients seeking medical advice, consultation, and a platform to discuss their medical conditions with doctors and fellow patients.

- **Nursing Home Patient Alert System:**

  - Target Users: Healthcare professionals in nursing homes and patients requiring continuous monitoring and timely medical assistance.
  
  

### Description of Clients and Problem Resolution

- **Health Discussion Platform:**
  - **Functionality:** Provides a platform for patients to consult with doctors, seek medical advice, and engage in discussions with other patients.
  - **Problem Resolution:** Enables patients to have convenient direct interactions with healthcare professionals, fostering a supportive community for sharing medical experiences and advice.
- **Nursing Home Patient Alert System:**
  - **Functionality:** Offers an alert system allowing healthcare professionals to promptly respond to patient needs.
  - **Problem Resolution:** Enhances patient safety in nursing homes, ensuring timely responses to urgent patient requirements. Reduces medical risks by providing real-time monitoring and alert features.



### Summary

Through the development of these two client applications, our service has made significant strides in the healthcare sector. The Health Discussion Platform facilitates direct patient-doctor consultations and establishes a supportive patient community. The Nursing Home Patient Alert System improves patient safety and provides an efficient tool for healthcare professionals to monitor and respond to patient needs.

The development of these applications underscores the versatility of our service, addressing specific issues in different domains to deliver valuable services to users. Looking ahead, we will continue refining these client applications, enhancing user experiences, and exploring opportunities to expand service applicability to meet a broader range of user needs.
