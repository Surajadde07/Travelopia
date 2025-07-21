# Travelopia - AI-Enhanced Travel Booking Platform

A full-stack travel booking platform built with the MERN stack, featuring AI-powered recommendations, secure payment processing, and modern responsive design.

## 🚀 Features

- **AI-Powered Recommendations**: Integrated Google Gemini AI for personalized travel suggestions
- **Secure Payment Processing**: Razorpay payment gateway integration
- **User Authentication**: JWT-based authentication and authorization
- **Responsive Design**: Modern UI built with React.js and Tailwind CSS
- **Real-time Data**: MongoDB cloud database with real-time updates
- **Custom Typography**: Beautiful fonts including Playfair Display, Inter, and custom BestJourney font

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Fonts** - Playfair Display, Inter, Monsieur La Doulaise, BestJourney

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication

### Integrations
- **Google Gemini AI** - AI-powered travel recommendations
- **Razorpay** - Payment gateway for secure transactions
- **MongoDB Atlas** - Cloud database hosting

## 📁 Project Structure

```
Travel lopia Gemini/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── fonts/
│   │   ├── index.css
│   │   └── ...
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
├── backend/
│   ├── .env
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB account
- Razorpay account
- Google AI Studio account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Travel lopia Gemini"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=4000
   DATABASE_URL=mongodb+srv://your-connection-string
   JWT_SECRET=your-jwt-secret
   RAZORPAY_KEY_ID=your-razorpay-key-id
   RAZORPAY_KEY_SECRET=your-razorpay-key-secret
   GEMINI_API_KEY=your-gemini-api-key
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000

## 🎨 Design Features

- **Custom Typography**: Multiple font families for different UI elements
- **Responsive Layout**: Optimized for all device sizes
- **Smooth Scrolling**: Enhanced user experience with smooth scroll behavior
- **Modern Styling**: Tailwind CSS for consistent and modern design

## 🔧 Available Scripts

### Frontend
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

### Backend
- `npm start` - Starts the server
- `npm run dev` - Starts the server in development mode with nodemon

## 🌟 Key Components

- **AI Integration**: Gemini AI for intelligent travel recommendations
- **Payment System**: Secure payment processing with Razorpay
- **Authentication**: JWT-based user authentication
- **Database**: MongoDB for scalable data storage
- **Responsive UI**: Mobile-first design approach

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

Developed by Suraj Adde

## 🙏 Acknowledgments

- Google Gemini AI for AI capabilities
- Razorpay for payment processing
- MongoDB Atlas for database hosting
- Create React App for project bootstrapping
- Tailwind CSS for styling framework

---

**Note**: Make sure to replace placeholder values in the `.env` file with your actual API keys and credentials before running the application.