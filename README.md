# Fan Meet & Greet Manager

A comprehensive web application for organizing and managing fan meet & greet events for music artists.

## Overview

The Fan Meet & Greet Manager streamlines the entire process of organizing fan interactions with music artists, from event creation to post-event follow-ups. It provides tools for both artists/managers and fans, ensuring a smooth and enjoyable experience for everyone involved.

## Features

- **Event Management**: Create, customize, and manage meet & greet events
- **Ticketing System**: Sell and manage different tiers of tickets with secure checkout
- **Queue Management**: Organize fans into digital queues with real-time updates
- **Media Capture & Sharing**: Collect and share photos/videos with proper consent
- **Virtual Meet & Greets**: Support for online fan interactions via video conferencing
- **Analytics Dashboard**: Track attendance, feedback, and engagement metrics
- **Communication Tools**: Automated notifications, reminders, and announcements
- **Mobile Responsive Design**: Accessible on all devices for artists and fans

## Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI
- Redux Toolkit
- Socket.IO (client)

### Backend
- Node.js with Express
- PostgreSQL (database)
- Redis (caching)
- Socket.IO (server)

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL (v13+)
- Redis

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/music-fan-meet-greet-system.git
   cd music-fan-meet-greet-system
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   ```
   # Create .env files in both server and client directories
   # using the provided .env.example templates
   ```

4. Set up the database:
   ```
   # In the server directory
   npm run db:setup
   ```

5. Start the development servers:
   ```
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend server
   cd ../client
   npm start
   ```

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── public/             # Static assets
│   └── src/                # React source code
│       ├── assets/         # Images, fonts, etc.
│       ├── components/     # Reusable UI components
│       ├── context/        # React contexts
│       ├── hooks/          # Custom React hooks
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── state/          # Redux store and slices
│       └── utils/          # Utility functions
├── server/                 # Backend Express application
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── db/                 # Database models and migrations
│   ├── middleware/         # Express middleware
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
└── docs/                   # Documentation
```

## API Documentation

The API documentation is available at `/api/docs` when running the development server.

## Security Considerations

- All authentication is handled via JWT with appropriate expiration
- Role-based access control for different user types
- HTTPS required for all production deployments
- Payment processing through Stripe (no credit card details stored)
- GDPR-compliant data handling and retention policies

## Deployment

### Docker Deployment

```
# Build and run with Docker Compose
docker-compose up -d
```

### AWS Deployment

Follow the detailed deployment guide in `docs/deployment-aws.md`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/dxaginfo/music-fan-meet-greet-system](https://github.com/dxaginfo/music-fan-meet-greet-system)