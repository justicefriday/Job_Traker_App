# 📊 Job Tracker Application

A full-stack MERN application for tracking job applications with authentication, CRUD operations, and real-time statistics.

**Live Demo:** https://job-traker-app-udeb.vercel.app

## 🌟 Overview

Job Tracker helps job seekers organize and manage their job applications in one place. Track application status, filter by progress, and visualize your job search journey.

## ✨ Key Features

- 🔐 User authentication with JWT
- ➕ Add, edit, and delete job applications
- 📊 Dashboard with application statistics
- 🔍 Filter jobs by status (Applied, Interview, Offer, Rejected)
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Bootstrap 5
- 🔔 Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM v6
- Zustand (state management)
- Bootstrap 5
- Axios
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs

## 📁 Project Structure
```
Job_Traker_App/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.js
│   └── package.json
│
├── backend/           # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/justicefriday/Job_Traker_App.git
   cd Job_Traker_App
```

2. **Setup Backend**
```bash
   cd backend
   npm install
   
   # Create .env file
   echo "PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key" > .env
   
   # Run backend
   npm run dev
```

3. **Setup Frontend**
```bash
   cd frontend
   npm install
   
   # Run frontend
   npm start
```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs (Protected)
- `GET /api/jobs` - Get all user jobs
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## 🌐 Deployment

- **Frontend:** Deployed on [Vercel](https://vercel.com)
- **Backend:** Deployed on [Render](https://render.com)
- **Database:** MongoDB Atlas

**Live URLs:**
- App: https://job-traker-app-udeb.vercel.app
- API: https://job-traker-app-backend.onrender.com

## 🎯 Roadmap

- [x] User authentication
- [x] Job CRUD operations
- [x] Status filtering
- [x] Statistics dashboard
- [ ] Search functionality
- [ ] Email notifications
- [ ] Export to CSV
- [ ] Calendar view

##  Author

**Justice Friday Udo**
- GitHub: [@justicefriday](https://github.com/justicefriday)
- LinkedIn: [linkedin.com/in/justice-friday](https://linkedin.com/in/justice-friday)
- Portfolio: [my-frontend-portfolio-6x59.vercel.app](https://my-frontend-portfolio-6x59.vercel.app/)

##  Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

##  Acknowledgments

- Built as part of a full-stack development learning journey
- Inspired by modern job tracking tools
- Thanks to the MERN stack community

---

⭐**If you found this project helpful, please give it a star!**