# 🧞‍♂️ Travel Genie - AI-Powered Travel Companion

![Travel Genie](https://img.shields.io/badge/Travel-Genie-blue?style=for-the-badge&logo=react)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Gemini%20Powered-purple?style=for-the-badge)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-orange?style=for-the-badge)

## 🌟 Overview

Travel Genie is a comprehensive, AI-powered travel companion built with the MERN stack. It combines the power of artificial intelligence, interactive maps, real-time features, and modern web technologies to provide an exceptional travel planning and exploration experience.

## ✨ Features

### 🏠 Core Features
- **Smart Home Page** - Beautiful landing page with animated genie logo and travel branding
- **Interactive Map** - Google Maps-like experience using Leaflet.js and OpenStreetMap
- **AI-Powered Recommendations** - Personalized place suggestions using Gemini API
- **Real-time Chat** - AI travel assistant for instant travel advice
- **Smart Itinerary Generator** - Automatic trip planning with AI
- **Offline Mode** - Works without internet connection with data sync

### 🗺️ Map Features
- Live user location tracking with GPS
- Custom markers and place saving
- Route calculation with multiple transport options
- Compass mode for mobile devices
- Light/Dark map themes
- Place search with autocomplete
- Map screenshot capture
- Location history timeline

### 🔐 Authentication & Security
- JWT-based authentication
- Guest mode support
- Google OAuth integration
- Email/phone verification
- Two-factor authentication
- Device and session management
- Encrypted document vault

### 🆘 Safety Features
- Emergency services shortcuts
- Panic mode with automatic alerts
- Real-time location sharing
- Emergency contact management
- Automatic emergency notifications

### 👥 Collaboration
- Group travel checklists
- Real-time collaboration with Socket.io
- Shareable itineraries
- Friend location sharing

### 📱 Progressive Web App (PWA)
- Installable from browser
- Offline functionality
- Push notifications
- Add to home screen
- App-like experience

### 🎨 UI/UX Excellence
- Fully responsive design (320px to desktop)
- Light/Dark mode toggle
- Smooth animations with Framer Motion & GSAP
- Custom cursor interactions
- Glass morphism effects
- Professional Tailwind CSS styling

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **Tailwind CSS** for modern styling
- **Zustand** for state management
- **Framer Motion** & **GSAP** for animations
- **React Router v6+** for navigation
- **React Leaflet** for interactive maps
- **Axios** for API calls
- **Heroicons** & **Lucide React** for icons

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **Socket.io** for real-time features
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Nodemailer** for email services

### APIs & Services
- **Gemini AI** for chat and recommendations
- **OpenStreetMap** for map data
- **Nominatim** for geocoding
- **OpenWeatherMap** for weather data
- **OpenRouteService** for routing

### Development Tools
- **ESLint** for code quality
- **Nodemon** for development
- **dotenv** for environment management
- **CORS** for cross-origin requests
- **Helmet** for security headers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shiveshmishra46/travel-genie.git
   cd travel-genie
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` with your API keys and configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/travel-genie
   
   # JWT
   JWT_SECRET=your-super-secret-jwt-key
   
   # APIs (Get from respective providers)
   GEMINI_API_KEY=your-gemini-api-key
   OPENWEATHER_API_KEY=your-openweather-api-key
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   
   # Email (Optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the application**
   ```bash
   # Start backend (from server directory)
   npm run dev
   
   # Start frontend (from client directory, new terminal)
   cd ../client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 🔧 API Configuration

### Required API Keys

1. **Gemini AI API**
   - Visit: https://makersuite.google.com/app/apikey
   - Create API key for AI features

2. **OpenWeatherMap API**
   - Visit: https://openweathermap.org/api
   - Free tier available for weather data

3. **Google OAuth** (Optional)
   - Visit: https://console.developers.google.com
   - Set up OAuth 2.0 credentials

### Optional Services

- **MongoDB Atlas** for cloud database
- **Firebase** for push notifications
- **Vercel/Netlify** for frontend hosting
- **Render/Railway** for backend hosting

## 📱 PWA Installation

1. Open the app in a supported browser
2. Click the "Install" button in the address bar
3. Or use "Add to Home Screen" from browser menu
4. Enjoy the native app experience!

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
vercel --prod
```

### Backend (Render/Railway)
```bash
cd server
# Update environment variables in hosting platform
# Deploy with: npm start
```

## 📁 Project Structure

```
travel-genie/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand stores
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── services/       # API services
│   │   ├── layouts/        # Layout components
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   ├── utils/              # Utility functions
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenStreetMap** for free map data
- **Gemini AI** for intelligent features
- **React** and **Node.js** communities
- **Tailwind CSS** for beautiful styling
- **Framer Motion** for smooth animations

## 📞 Support

For support, email support@travelgenie.app or join our Discord community.

## 🔮 Roadmap

- [ ] Advanced AI trip planning
- [ ] Social features and friend system
- [ ] Augmented reality navigation
- [ ] Voice-guided tours
- [ ] Multi-language support
- [ ] Travel cost estimation
- [ ] Hotel/flight booking integration
- [ ] Travel insurance recommendations

---

<div align="center">
  <p>Made with ❤️ by the Travel Genie Team</p>
  <p>🧞‍♂️ <em>"Your wish for the perfect trip is our command!"</em> ✨</p>
</div>