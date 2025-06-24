require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const { rateLimit } = require('express-rate-limit');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const artistRoutes = require('./routes/artist.routes');
const eventRoutes = require('./routes/event.routes');
const ticketRoutes = require('./routes/ticket.routes');
const queueRoutes = require('./routes/queue.routes');
const mediaRoutes = require('./routes/media.routes');
const notificationRoutes = require('./routes/notification.routes');
const feedbackRoutes = require('./routes/feedback.routes');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');

// Import socket handlers
const socketHandlers = require('./socket/handlers');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io middleware and event handlers
io.use(socketHandlers.authMiddleware);
socketHandlers.registerHandlers(io);

// API Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.'
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fan Meet & Greet Manager API',
      version: '1.0.0',
      description: 'API documentation for Fan Meet & Greet Manager',
      contact: {
        name: 'API Support',
        email: 'support@fanmeetgreet.com'
      }
    },
    servers: [
      {
        url: process.env.API_URL || 'http://localhost:5000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestLogger);
app.use('/api/', apiLimiter);

// API documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/queues', queueRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

module.exports = { app, server, io };