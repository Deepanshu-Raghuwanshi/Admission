# Admission Portal Application

A full-stack application for managing admission forms with React, TypeScript, Node.js, Express, and MongoDB.

## Project Structure

- `BE/` - Backend Node.js application with Express and MongoDB
- `FE/` - Frontend React application with TypeScript and Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Getting Started

## Clone repo

git clone https://github.com/Deepanshu-Raghuwanshi/Admission.git
cd admission

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd BE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the BE directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/admission_db(production uri example use your personal =>mongodb+srv://dipanshuraghuwanshi:password@cluster0.luqz6xt.mongodb.net/admission?retryWrites=true&w=majority)
   JWT_SECRET=your_jwt_secret_key_here
   LOG_LEVEL=info
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd FE/my-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   if deploying then create env on root of FE with this for backend url
   VITE_API_URL=your_backend_url_here

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Features

- **Admission Form**: Users can submit admission forms with their details
- **Admin Dashboard**: Admins can view and manage all submitted admission forms
- **Form Validation**: Client-side validation for all form fields
- **Responsive Design**: Works on all device sizes

## API Endpoints

- `POST /api/admissions` - Create a new admission
- `GET /api/admissions` - Get all admissions
- `GET /api/admissions/:id` - Get a specific admission by ID
- `PUT /api/admissions/:id` - Update an admission
- `DELETE /api/admissions/:id` - Delete an admission

## Technologies Used

### Frontend

- React
- TypeScript
- React Router
- React Hook Form
- Axios
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Winston (logging)
- Cors
- Dotenv
