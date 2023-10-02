# User API Documentation

## Introduction

Welcome to the User API documentation. This API provides endpoints for user registration, login, and profile retrieval.

### Base URL

The base URL for all API endpoints is `http://your-api-base-url/api/v1/user`.

## Endpoints

### 1. Register User

#### Register a New User

- **Endpoint**: `/register`
- **HTTP Method**: `POST`
- **Description**: Register a new user.
- **Request**:
  - **Body**: JSON object containing user details (name, email, password, user type).
    ```json
    {
      "uName": "John Doe",
      "uEmail": "johndoe@example.com",
      "uPassword": "password123",
      "uType": "doctor"
    }
    ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Data**: JSON object containing a user object and an authentication token.
    ```json
    {
      "token": "your-authentication-token",
      "user": {
        "userId": 1,
        "userName": "John Doe",
        "userEmail": "johndoe@example.com",
        "userType": "doctor"
      }
    }
    ```

### 2. Login User

#### Authenticate and Log In a User

- **Endpoint**: `/login`
- **HTTP Method**: `POST`
- **Description**: Authenticate and log in a user.
- **Request**:
  - **Body**: JSON object containing user email and password.
    ```json
    {
      "uEmail": "johndoe@example.com",
      "uPassword": "password123"
    }
    ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON object containing a user object and an authentication token.
    ```json
    {
      "token": "your-authentication-token",
      "user": {
        "userId": 1,
        "userName": "John Doe",
        "userEmail": "johndoe@example.com",
        "userType": "doctor"
      }
    }
    ```

### 3. User Profile

#### Get User Profile

- **Endpoint**: `/profile`
- **HTTP Method**: `GET`
- **Description**: Retrieve the user's profile.
- **Request**: Requires authentication token (Bearer token) in the request header.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON object containing the user's profile information.
    ```json
    {
      "userId": 1,
      "userName": "John Doe",
      "userEmail": "johndoe@example.com",
      "userType": "doctor"
    }
    ```

## Authentication

To access the "User Profile" endpoint, you must include an `Authorization` header with a valid JWT (JSON Web Token) obtained through the login or registration process.

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios, such as validation errors or internal server errors.

## Rate Limiting

This API does not have rate limiting implemented, but it's advisable to avoid sending too many requests in a short period.

---

This concludes the User API documentation. For more details about each endpoint, including request and response examples, refer to the individual endpoint descriptions above.

If you have any further questions or need assistance, please refer to the API documentation or contact the system administrator.
