# User Tracking Page
## Description:
This project is a user tracking application that consists of a frontend and a backend, both containerized using Docker. 
The frontend is built with Vue.js, and the backend is built using Node.js with Express. The application tracks user actions, displaying the data in reports on the frontend.

## Getting Started:
1. Clone the Repository:
```
git clone https://github.com/your-username/user-tracking-page.git
cd user-tracking-page
```

2. Run the Application with Docker:
```
docker-compose up --build
```
- The frontend will be accessible at http://localhost:8000.
- The backend API will be accessible at http://localhost:3000.

3. Stopping the Containers:
To stop the running Docker containers:
```
docker-compose down

```

## Local Development (Without Docker):
If you want to run the application locally without Docker:

### Backend:

1. Navigate to the server directory:
```
cd server

```

2. Install the dependencies:
```
npm install
```


3. Start the server:
```
npm start
```
The backend API will be running on http://localhost:3000.

### Frontend:
1. Navigate to the client directory:
```
cd client
```

2. Install the dependencies:
```
npm install
```

3. Start the frontend:
```
npm run serve
```
The frontend will be running on http://localhost:8080.

## Environment Variables:
- Frontend (client/.env):
  - Adjust as needed for the frontend configuration.
- Backend (server/.env):
  - PORT=3000
  - FAKE_USER_API = "https://random-data-api.com/api/v2/users"
  - SESSION_SECRET="your-session-secret"
  - with docker: MONGODB_URI=mongodb://mongo:27017/userTrackingDB
  - locally I used: 
    MONGODB_URI = "mongodb+srv://<user>:<password>@usertracking.yljf158.mongodb.net/?retryWrites=true&w=majority&appName=UserTracking"




