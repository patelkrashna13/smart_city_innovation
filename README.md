# Smart City Dashboard

A comprehensive, modern Smart City Dashboard built with React, TypeScript, and Tailwind CSS. This application provides real-time monitoring and management of city infrastructure and services.

## 🌟 Features

### Core Modules
- **Smart Parking System** - Real-time parking availability and management
- **Live Traffic Dashboard** - Traffic monitoring and congestion analysis
- **Public Transport Tracker** - Bus routes and arrival time tracking
- **Waste Management** - IoT-enabled waste monitoring and collection
- **Energy Consumption** - Building-wise energy usage tracking
- **Water Supply & Quality** - Water distribution and quality monitoring
- **Emergency Services** - Emergency response coordination
- **Crime Monitor** - Crime tracking and safety analytics
- **Citizen Reports** - Community issue reporting system
- **Tree Tracker** - Urban tree plantation monitoring
- **Civic Alerts** - Real-time city notifications
- **Budget Tracker** - Municipal budget allocation and tracking
- **Local Businesses** - Business directory and economic indicators
- **AI Assistant** - Intelligent city services chatbot

### Design Features
- 🎨 Modern, responsive design with glassmorphism effects
- 🌓 Dark/Light mode toggle with smooth transitions
- ✨ Framer Motion animations throughout
- 📱 Mobile-first responsive design
- 🎯 Intuitive navigation with collapsible sidebar
- 🔄 Real-time data visualization
- 📊 Interactive charts and progress indicators

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Hot Toast** for notifications

### Backend Integration Ready
- **Django REST Framework** API endpoints
- **JWT Authentication** for protected routes
- **Real-time WebSocket** connections
- **PostgreSQL** database support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-city-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Card, Modal, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, Layout)
│   └── dashboard/      # Dashboard-specific components
├── pages/              # Page components for each module
├── contexts/           # React contexts (Theme, etc.)
├── utils/              # Utility functions and API client
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## 🎨 Design System

### Color Palette
- **Primary**: Sky Blue (#3B82F6) - Technology and innovation
- **Secondary**: Leafy Green (#10B981) - Sustainability and environment
- **Accent**: Asphalt Gray (#64748B) - Urban infrastructure
- **Supporting**: Orange (#F97316), Purple (#8B5CF6), Cyan (#06B6D4)

### Typography
- **Headings**: Poppins (600-700 weight)
- **Body**: Inter (300-500 weight)
- **UI Elements**: System fonts for optimal performance

### Spacing & Layout
- **8px grid system** for consistent spacing
- **Rounded corners**: 2xl (16px) for cards and components
- **Shadows**: Medium to large for depth and hierarchy
- **Responsive breakpoints**: Mobile-first approach

## 🔧 API Integration

The application is designed to integrate with Django REST Framework backends. API endpoints are organized by module:

### Authentication
- `POST /api/auth/login/` - User authentication
- `POST /api/auth/refresh/` - Token refresh

### Smart Parking
- `GET /api/parking/lots/` - Get all parking lots
- `GET /api/parking/lots/{id}/availability/` - Get availability for specific lot

### Traffic Management
- `GET /api/traffic/current/` - Current traffic data
- `GET /api/traffic/incidents/` - Traffic incidents

### Public Transport
- `GET /api/transport/bus-routes/` - Bus route information
- `GET /api/transport/bus-stops/{id}/arrivals/` - Real-time arrivals

[Additional API endpoints for each module...]

## 🔐 Security Features

- JWT-based authentication
- Protected routes and API endpoints
- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Environment variable management for sensitive data

## 📊 Data Visualization

The dashboard includes various chart types and visualizations:
- **Line charts** for time-series data (energy consumption, water quality)
- **Bar charts** for comparative data (budget allocation, crime statistics)
- **Pie charts** for distribution data (waste categories, budget breakdown)
- **Heatmaps** for geographic data (crime hotspots, traffic congestion)
- **Progress bars** for completion tracking (tree growth, budget utilization)
- **Real-time gauges** for live metrics (water pressure, energy load)

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file with the following variables:
```env
VITE_API_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws
VITE_MAPS_API_KEY=your_maps_api_key
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** for high-quality stock images
- **Lucide** for beautiful, consistent icons
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth, performant animations
- **React Community** for excellent documentation and support

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation wiki

---

Built with ❤️ for smarter, more connected cities.