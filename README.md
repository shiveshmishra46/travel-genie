# Travel Genie 🧞‍♂️✨

Your AI-Powered Travel Companion - A comprehensive travel planning and exploration app built with React, TypeScript, and cutting-edge AI technology.

## 🚀 Features

### Core Features
- **🗺️ Interactive Map** - Explore locations with real-time search, markers, and routing using Leaflet
- **🤖 AI Assistant** - Get personalized travel recommendations powered by Gemini AI
- **📍 Smart Recommendations** - Discover places with intelligent filtering and categorization
- **📅 Itinerary Generator** - Create detailed travel plans with AI assistance
- **👥 Group Planning** - Collaborative checklists for group trips
- **🆘 Emergency Services** - Quick access to emergency contacts and panic mode
- **🔊 Voice Search** - Search using voice commands
- **📱 PWA Ready** - Install as an app on any device

### Advanced Features
- **🌐 Offline Mode** - Core features work without internet
- **📂 Document Vault** - Secure storage for travel documents
- **📍 Location History** - Track your travel journey
- **🎯 Real-time Sync** - Data synchronization across devices
- **🌙 Dark/Light Mode** - Adaptive theme with smooth transitions
- **📱 Responsive Design** - Perfect on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/UI, Radix UI
- **Maps**: Leaflet, React-Leaflet, OpenStreetMap
- **AI**: Gemini API integration via Spark SDK
- **Animations**: Framer Motion, GSAP
- **Icons**: Phosphor Icons
- **Data Persistence**: Spark KV (built-in storage)
- **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-genie
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   ├── LogoGenie.jsx   # App logo component
│   ├── Navbar.jsx      # Navigation bar
│   ├── InteractiveMap.jsx
│   ├── ChatBot.jsx     # AI assistant
│   ├── EmergencyButton.jsx
│   └── VoiceSearchButton.jsx
├── context/            # React context providers
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   ├── useGeolocation.js
│   ├── useNetworkStatus.js
│   ├── useVoiceSearch.js
│   └── use-mobile.ts
├── pages/              # Application pages
│   ├── HomePage.jsx
│   ├── MapPage.jsx
│   ├── RecommendationsPage.jsx
│   ├── ItineraryPage.jsx
│   └── GroupPage.jsx
├── lib/                # Utility functions
└── styles/             # CSS and theme files
```

## 🎨 Design System

### Color Palette
- **Primary**: Deep Ocean Blue - Trust and reliability
- **Secondary**: Warm Sand - Welcoming destinations
- **Accent**: Sunset Orange - Adventure and energy
- **Success**: Fresh Mint - Positive actions

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Bold headings, regular body text
- **Responsive**: Scales beautifully across devices

### Animation Philosophy
- **Purposeful**: Every animation serves a function
- **Travel-inspired**: Movement suggests exploration
- **Smooth**: 60fps performance on all devices

## 🤖 AI Features

### Gemini AI Integration
- **Travel Recommendations**: Context-aware suggestions
- **Itinerary Generation**: Detailed day-by-day plans
- **Chatbot Assistant**: Natural language travel help
- **Smart Suggestions**: Personalized place recommendations

### Voice Search
- **Natural Language**: "Find restaurants near me"
- **Hands-free**: Perfect for mobile use
- **Cross-platform**: Works on all modern browsers

## 📱 Mobile Experience

### Responsive Design
- **Mobile-first**: Optimized for phone usage
- **Touch-friendly**: Large tap targets and gestures
- **Fast loading**: Optimized assets and lazy loading

### PWA Features
- **Installable**: Add to home screen
- **Offline capable**: Core features work without internet
- **Fast**: Instant loading with service workers

## 🔐 Data & Privacy

### Data Storage
- **Local-first**: Data stored locally using Spark KV
- **Sync when needed**: Online features sync across devices
- **No tracking**: Privacy-focused design

### Security
- **No sensitive data**: Minimal data collection
- **Encrypted storage**: Documents encrypted before storage
- **User control**: Full control over your data

## 🌍 Internationalization

### Multi-language Support (Coming Soon)
- English (default)
- Spanish
- French
- German
- Japanese

### Local Adaptation
- **Currency**: Local currency display
- **Time zones**: Automatic timezone detection
- **Cultural preferences**: Region-specific recommendations

## 🛠️ Development

### Code Style
- **ESLint**: Consistent code formatting
- **TypeScript**: Type safety and better DX
- **Modular**: Atomic component architecture
- **Clean**: Well-documented and maintainable

### Performance
- **Bundle optimization**: Tree-shaking and code splitting
- **Image optimization**: WebP format with fallbacks
- **Caching**: Smart caching strategies
- **Lighthouse**: 90+ scores across all metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Static website hosting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/UI** - Beautiful component library
- **Leaflet** - Amazing mapping library
- **Phosphor Icons** - Perfect icon set
- **Gemini AI** - Powerful AI capabilities
- **Vercel** - Excellent hosting platform

## 📞 Support

- **Documentation**: Check the [Wiki](../../wiki)
- **Issues**: Report bugs on [GitHub Issues](../../issues)
- **Discussions**: Join the [GitHub Discussions](../../discussions)
- **Email**: support@travelgenie.app

---

**Travel Genie** - Making travel planning intelligent, collaborative, and delightful! ✈️🗺️✨

*Built with ❤️ for travelers around the world*