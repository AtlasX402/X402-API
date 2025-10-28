# AtlasX402-API

Backend API for the AtlasX402 navigator. Provides endpoints for managing x402 protocol resources.

## Setup
1. `npm install`
2. `npm run dev` (for development with nodemon)
3. Access at `http://localhost:3000/api/resources`

## Endpoints
- GET `/api/resources`: Get all resources
- GET `/api/resources/:id`: Get resource by ID
- POST `/api/resources`: Add new resource (body: JSON)
- PUT `/api/resources/:id`: Update resource (body: JSON)
- DELETE `/api/resources/:id`: Delete resource

Integrate with the frontend by fetching from these endpoints instead of static JSON.
