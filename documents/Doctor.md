# Doctor API Documentation

## Introduction

Welcome to the Doctor API documentation. This API provides endpoints for doctor-related operations, including doctor registration and retrieval of doctor information.

### Base URL

The base URL for all API endpoints is `http://your-api-base-url/api/v1/doctor`.

## Endpoints

### 1. Insert Doctor Information

#### Insert Doctor Information

- **Endpoint**: `/insert-info`
- **HTTP Method**: `POST`
- **Description**: Insert doctor information.
- **Authentication**: Protected (Only accessible to "doctor" users).
- **Request**:
  - **Body**: JSON object containing doctor details (speciality, fee per hour, year of experience).
    ```json
    {
      "speciality": "Cardiology",
      "feePerHour": 150,
      "yearOfExperience": 10
    }
    ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Data**: JSON object containing a success message and the inserted doctor's details.
    ```json
    {
      "message": "Doctor information inserted successfully.",
      "doctor": {
        "userId": 1,
        "speciality": "Cardiology",
        "feePerHour": 150,
        "yearOfExperience": 10
      }
    }
    ```

### 2. Get Distinct Doctor Types

#### Get Distinct Doctor Specialities

- **Endpoint**: `/problem-types`
- **HTTP Method**: `GET`
- **Description**: Retrieve distinct doctor specialities.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON object containing distinct doctor specialities.
    ```json
    {
      "types": ["Cardiology", "Dermatology", "Orthopedics"]
    }
    ```

### 3. Find Doctors by Speciality

#### Find Doctors by Speciality

- **Endpoint**: `/doctors-by-type/:speciality`
- **HTTP Method**: `GET`
- **Description**: Retrieve doctors by speciality.
- **URL Parameters**:
  - `speciality`: The speciality of doctors to retrieve.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON object containing doctors matching the specified speciality.
    ```json
    {
      "doctors": [
        {
          "userId": 1,
          "speciality": "Cardiology",
          "feePerHour": 150,
          "yearOfExperience": 10
        },
        {
          "userId": 2,
          "speciality": "Cardiology",
          "feePerHour": 140,
          "yearOfExperience": 8
        }
      ]
    }
    ```

## Authentication

To access the "Insert Doctor Information" endpoint, you must be authenticated as a "doctor" user. Use a valid JWT (JSON Web Token) with the "doctor" user type for authentication.

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios, such as validation errors or unauthorized access.

## Rate Limiting

This API does not have rate limiting implemented, but it's advisable to avoid sending too many requests in a short period.

---

This concludes the Doctor API documentation. For more details about each endpoint, including request and response examples, refer to the individual endpoint descriptions above.

If you have any further questions or need assistance, please refer to the API documentation or contact the system administrator.
