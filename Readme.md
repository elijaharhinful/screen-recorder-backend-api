# CHROME EXTENSION BACKEND Documentation

## Introduction

This API picks chunks of video files and combines them to form one video, transcribe the video and return both the video and transcription

## Demo

Make a request to this url to https://screen-recorder-backend-api.up.railway.app/

```
To : 
https://screen-recorder-backend-api.up.railway.app/api/uploads/
```

## Installation

1. Ensure you have Node.js, sequelize and mongoose installed on your machine.
2. Clone the GitHub repository.
3. Install the required packages using `npm install`.
4. Start the server using `npm run dev`.

## Endpoint

### UPLOAD /api/uploads/

Uploads the videos chunks and combines to form one video

**Request:**

in the request body upload the video as a form data

**Response:**

Returns the person's data:

```
{
    "status": status_code,
    "message": string,
    "video": {
        "title": string,
        "filePath": path_string,
        "fileUrl": url_string,
        "_id": string,
        "createdAt": datetime,
        "updatedAt": datetime,
        "__v": 0
    }
}
```

## Errors and Bad response

In the case of an error or a `404 request` the API responds with a defined status code and an error message. The API will return:


```
{
"status": status_code,
"message": "error message",
"error": error details,
}
```
