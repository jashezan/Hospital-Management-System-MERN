# Appointment API Documentation

## Introduction

Welcome to the Appointment API documentation. This API provides endpoints for managing appointments, including creating new appointments and retrieving appointment information.

### Base URL

The base URL for all API endpoints is `http://your-api-base-url/api/v1/appointment`.

## Endpoints

### 1. Create Appointment

#### Create Appointment

- **Endpoint**: `/create-appointment`
- **HTTP Method**: `POST`
- **Description**: Create a new appointment.
- **Authentication**: Protected (Requires authentication as an employee).
- **Request**:
  - **Body**: JSON object containing appointment details.
    ```json
    {
      "patientName": "John Doe",
      "patientDOB": "1990-05-15",
      "patientProb": "Fever",
      "patientDesc": "Description of the problem",
      "doctorId": 1,
      "startTime": "2023-09-20T10:00:00Z",
      "endTime": "2023-09-20T11:00:00Z"
    }
    ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Data**: JSON object containing a success message and the created appointment details.
    ```json
    {
      "message": "Appointment created successfully",
      "data": {
        "appId": 1,
        "patientName": "John Doe",
        "patientDOB": "1990-05-15",
        "patientProb": "Fever",
        "patientDesc": "Description of the problem",
        "doctorId": 1,
        "startTime": "2023-09-20T10:00:00Z",
        "endTime": "2023-09-20T11:00:00Z"
      }
    }
    ```

### 2. Get All Appointments

#### Get All Appointments

- **Endpoint**: `/get-appointments`
- **HTTP Method**: `GET`
- **Description**: Retrieve all appointments.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON array containing all appointment records.
    ```json
    [
      {
        "appId": 1,
        "patientName": "John Doe",
        "patientDOB": "1990-05-15",
        "patientProb": "Fever",
        "patientDesc": "Description of the problem",
        "doctorId": 1,
        "startTime": "2023-09-20T10:00:00Z",
        "endTime": "2023-09-20T11:00:00Z"
      },
      // ... more appointments
    ]
    ```

### 3. Get Future Appointments for Doctor

#### Get Future Appointments for Doctor

- **Endpoint**: `/:doctorId`
- **HTTP Method**: `GET`
- **Description**: Retrieve future appointments for a specific doctor.
- **URL Parameters**:
  - `doctorId`: The ID of the doctor to retrieve future appointments for.
- **Response**:
  - **Status Code**: `200 OK`
  - **Data**: JSON array containing future appointments for the specified doctor.
    ```json
    [
      {
        "appId": 2,
        "patientName": "Alice Smith",
        "patientDOB": "1985-08-25",
        "patientProb": "Checkup",
        "patientDesc": "Description of the problem",
        "doctorId": 1,
        "startTime": "2023-09-22T09:30:00Z",
        "endTime": "2023-09-22T10:30:00Z"
      },
      // ... more appointments for the doctor
    ]
    ```

## Authentication

To access the "Create Appointment" endpoint, you must be authenticated as an employee. Use a valid JWT (JSON Web Token) with appropriate permissions for authentication.

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios, such as validation errors, unauthorized access, or internal server errors.

## Rate Limiting

This API does not have rate limiting implemented, but it's advisable to avoid sending too many requests in a short period.

---

This concludes the Appointment API documentation. For more details about each endpoint, including request and response examples, refer to the individual endpoint descriptions above.

If you have any further questions or need assistance, please refer to the API documentation or contact the system administrator.
