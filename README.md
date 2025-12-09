# Clinic Management System - Full Stack Web Application

A complete full-stack web application for managing clinic patients and their visits, built with React frontend and Node.js/Express backend.

## 🏥 Features

- **Patient Management**: Add new patients with name, age, and height
- **Visit Tracking**: Record medical visits with date and detailed observations
- **Data Visualization**: View all patients and their complete visit history
- **Responsive Design**: Professional interface that works on desktop and mobile
- **Form Validation**: Comprehensive client-side validation for data integrity
- **Error Handling**: Robust error handling with user-friendly messages

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MySQL** database for data storage
- **CORS** for cross-origin requests
- **Body-parser** for request parsing

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **Axios** for HTTP requests
- **Custom CSS** for styling

## 📁 Project Structure

```
Lab 5/
├── backend/
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server with API routes
├── frontend/
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration with proxy
│   ├── index.html            # HTML entry point
│   └── src/
│       ├── main.jsx          # React entry point
│       ├── App.jsx           # Main application component
│       ├── index.css         # Global styles
│       ├── api.js            # API service layer
│       └── components/
│           ├── PatientList.jsx    # Display patients and visits
│           ├── AddPatient.jsx     # Add new patient form
│           └── AddVisit.jsx       # Add visit form
├── setup.bat                 # Setup script for dependencies
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL server running locally
- Database named 'clinic' with tables:
  - `patients` table with columns: `id`, `name`, `age`, `height`
  - `visits` table with columns: `id`, `patient_id`, `visit_date`, `observations`

### Database Setup
Make sure you have MySQL running and the 'clinic' database created with the required tables. The backend expects these tables to exist.

### Installation & Setup

1. **Run the setup script** (Windows):
   ```batch
   setup.bat
   ```

   Or manually install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   ```
   Backend will run on: http://localhost:3000

2. **Start the frontend development server** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

3. **Access the application**:
   Open your browser and navigate to http://localhost:5173

## 📋 API Endpoints

### Backend API (http://localhost:3000)

- `GET /patients` - Retrieve all patients with their visit history
- `POST /patients` - Add a new patient
- `POST /visits` - Add a visit for an existing patient

### Request Examples

**Add Patient**:
```json
POST /patients
{
  "name": "John Doe",
  "age": 35,
  "height": 175.5
}
```

**Add Visit**:
```json
POST /visits
{
  "patient_id": 1,
  "visit_date": "2025-12-09",
  "observations": "Patient complained of headaches. Prescribed rest and hydration."
}
```

## 🎯 User Interface

The application provides three main views:

1. **View Patients**: See all patients and their complete visit history
2. **Add Patient**: Register new patients with basic information
3. **Add Visit**: Record medical visits for existing patients

### Features of Each View

- **Patient List**: Cards displaying patient info and chronological visit history
- **Add Patient Form**: Validated form with name, age, and height inputs
- **Add Visit Form**: Dropdown to select patient, date picker, and detailed observations

## 🔧 Configuration

### Frontend Proxy Configuration
The Vite configuration includes a proxy to forward `/api` requests to the backend:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### Backend Database Connection
Update the MySQL connection details in `backend/server.js`:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'clinic'
});
```

## 🛡 Error Handling

The application includes comprehensive error handling:
- **API Errors**: Connection issues, server errors
- **Validation Errors**: Client-side form validation
- **User Feedback**: Success and error messages
- **Loading States**: Visual feedback during data operations

## 📱 Responsive Design

The interface is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🚀 Building for Production

To build the frontend for production:
```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory and can be served by any static file server.

## 🔍 Development Notes

- The frontend uses modern React patterns with hooks
- API calls are centralized in the `api.js` service layer
- CSS is organized with utility classes for consistency
- Form validation is performed both client-side and server-side
- The application uses a simple state management approach with React hooks

## 📞 Support

This is a complete full-stack application demonstrating:
- Frontend-backend integration
- RESTful API communication
- Modern React development
- Professional UI/UX design
- Data validation and error handling

The application is ready for deployment and can be easily extended with additional features like user authentication, appointment scheduling, or medical reports.
