# Honda Service Portal - MERN Stack Application

A full-stack vehicle service booking and management system built with MongoDB, Express, React, and Node.js.

## Features

### User Features
- User authentication (Sign up/Login)
- Book vehicle service appointments
- Select multiple services
- View booking status in real-time
- Receive email notifications on booking status changes
- Automatic price calculation with GST and service tax

### Admin Features
- View all bookings in admin dashboard
- Accept/Decline booking requests
- Assign mechanics to bookings
- Mark bookings as in-progress or completed
- Automated email notifications to users

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- React Toastify
- SweetAlert2
- Framer Motion

### Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for emails
- Helmet for security
- Express Rate Limit

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Gmail account with App Password

### Backend Setup

1. Navigate to backend directory:
```bash
cd Vehicle_Backend_Server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
MONGO_URL=your_mongodb_connection_string
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_16_char_app_password
JWT_SECRET=your_random_secret_key
ADMIN_EMAILS=admin@example.com
CLIENT_ORIGIN=http://localhost:5173
```

4. Start server:
```bash
npm start
```

Server runs on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd react
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
VITE_API_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel and Render.

### Quick Deployment Steps

1. **Backend to Render**:
   - Push backend code to GitHub
   - Connect repo to Render
   - Add environment variables
   - Deploy

2. **Frontend to Vercel**:
   - Push frontend code to GitHub
   - Connect repo to Vercel
   - Add `VITE_API_URL` environment variable
   - Deploy

3. **Update CORS**:
   - Update `CLIENT_ORIGIN` on Render with your Vercel URL

## Project Structure

```
Mern_Project/
├── Vehicle_Backend_Server/    # Backend
│   ├── Controller.js          # Route handlers
│   ├── vehicle.js            # Express app setup
│   ├── middlewear.js         # Auth middleware
│   ├── mailer.js             # Email service
│   ├── signModel.js          # User model
│   ├── AppModel.js           # Booking model
│   ├── package.json
│   └── .env.example
│
├── react/                     # Frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── UserStatus.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── config/
│   │   │   └── api.js        # API URL config
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env.example
│
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## Environment Variables

### Backend
| Variable | Description | Example |
|----------|-------------|---------|
| MONGO_URL | MongoDB connection string | mongodb+srv://... |
| EMAIL_USER | Gmail address for sending emails | your@gmail.com |
| EMAIL_PASS | Gmail app password (16 chars) | abcdefghijklmnop |
| JWT_SECRET | Secret key for JWT | random-secret-string |
| ADMIN_EMAILS | Comma-separated admin emails | admin@example.com |
| CLIENT_ORIGIN | Frontend URL for CORS | http://localhost:5173 |
| PORT | Server port (optional) | 3000 |

### Frontend
| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## API Endpoints

### Authentication
- `POST /newuser` - Create new user
- `POST /login` - User login

### Bookings
- `POST /createbooking` - Create new booking (Auth required)
- `GET /userstatus` - Get user's bookings (Auth required)
- `GET /bookingtoadmin` - Get all bookings (Admin only)
- `PATCH /bookings/:id/status` - Update booking status (Admin only)

## Admin Setup

To set up admin access:
1. Add admin email to `ADMIN_EMAILS` in backend `.env`
2. Sign up with that email
3. Login - you'll automatically have admin access

## Email Notifications

Users receive emails when:
- Booking is created (pending status)
- Admin accepts the booking
- Service is completed

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- Helmet for HTTP security headers
- CORS protection
- Input validation

## License

ISC

## Author

[Your Name]

## Support

For issues and questions, please create an issue in the GitHub repository.
