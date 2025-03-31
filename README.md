# Toyota President App

This app allows users to interact with the Toyota Connected President AI, asking questions and receiving speech responses.

## Features
- Conversational AI interface.
- Speech-to-text and text-to-speech capabilities.
- Provides quick responses to company-related inquiries.

## Setup Guide

### 1. Extract the ZIP File
Extract the provided ZIP file to your desired location.

### 2. Install Dependencies
```sh
npm install
```

### 3. Create an `.env` File
Create a `.env` file in the root directory and add the following:
```sh
VITE_API_BASE_URL=https://xvka3jcvrpzywgjvswb7hnp4jy0jhnzl.lambda-url.us-east-1.on.aws
```

### 4. Run the Project
For development mode:
```sh
npm run dev
```

For production build:
```sh
npm run build
```

### 5. Deploying
If you are using **Netlify**, run:
```sh
netlify deploy
```
For production:
```sh
netlify deploy --prod
```

## Troubleshooting
- If the API request fails, check your `.env` file and make sure the API URL is correct.
- If you face CORS issues, ensure the backend has the correct CORS headers.
- If the `.env` file is not loading, restart the development server.
