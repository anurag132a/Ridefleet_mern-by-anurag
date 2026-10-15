# RideFleet — MERN Stack Edition

A conversion of the RideFleet Flask prototype into a MERN-style application:
- **MongoDB** via Mongoose
- **Express.js + Node.js** REST API
- **React + Vite** responsive dashboard
- **JWT** authentication and role-based authorization

## Features
- Customer registration/login and owner login
- Separate customer and owner workspaces (demo credentials are not displayed on the login screen)
- Customer KYC submission and owner approval/rejection
- Multiple substations and bike inventory
- Bike reservation and pickup-code collection
- Ride return using ending odometer
- Automatic distance calculation and billing (default ₹12/km)
- Customer ride history, owner customer directory, fleet status, bookings, revenue and distance summaries
- Add bike and substation from the owner dashboard
- KYC values are hashed for the prototype and only last four characters are displayed

## Requirements
- Node.js 18 or newer
- MongoDB local instance or MongoDB Atlas account
- VS Code (recommended)

## Setup on Windows (PowerShell)

### 1. Configure backend
Open the extracted `ridefleet_mern` folder in VS Code. Open a terminal:

```powershell
cd backend
Copy-Item .env.example .env
```

Edit `backend/.env`. For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string and put your database name at the end, e.g. `.../ridefleet`. Also configure the Atlas Network Access IP allowlist and database user. Set a long random `JWT_SECRET`.

Example local settings:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ridefleet
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_ORIGIN=http://localhost:5173
PRICE_PER_KM=12
```

Then install packages and seed demo records:
```powershell
npm install
npm run seed
npm run dev
```
The API runs on `http://localhost:5000`.

### 2. Start frontend in a SECOND terminal
From the project root:
```powershell
cd frontend
npm install
npm run dev
```
Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

### Demo accounts
- Owner: `owner` / `owner123`
- Customer: `customer` / `customer123`

Seed is safe to rerun: it only adds missing demo users, stations and bikes; it does not delete existing data. Change demo passwords before any shared deployment.

## Notes / production checklist
This is an academic prototype, not a production-ready rental/payment platform. Before public deployment, add rate limiting, CSRF strategy where relevant, stricter validation, audit logging, secure secret management, HTTPS, backups, robust KYC compliance, and a compliant payment/identity provider. The prototype stores only hashes and last-four values for submitted KYC fields, but hashing is not a substitute for a legally compliant identity-verification workflow. Pickup codes are returned to the authenticated booking owner for this prototype; production deployments should add expiration, attempt limits, and station-side staff verification.
