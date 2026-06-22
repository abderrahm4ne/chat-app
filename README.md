# QwikChat

A real-time full-stack chat application with authentication and image sharing.

## Tech Stack

**Frontend**
- React 19, TypeScript, Vite
- Redux Toolkit + RTK Query
- Socket.io-client
- Tailwind CSS

**Backend**
- Node.js, Express 5
- MongoDB + Mongoose
- Socket.io
- JWT (httpOnly cookies)
- Cloudinary (image uploads)

## Architecture Decisions

- RTK Query handles all REST (auth, user data) — separate socket slice manages real-time messages to avoid mixing concerns
- JWT stored in httpOnly cookies, not localStorage — prevents XSS token theft
- Socket.io rooms scoped per conversation, not global broadcast

## Features

- Real-time messaging with Socket.io
- JWT authentication
- Image sharing via Cloudinary
- Online presence indicators


## Run Locally
```sh
    cd frontend 
    npm install 
    npm run dev
``` 
```sh
    cd backend
    npm install
    npm run dev
``` 