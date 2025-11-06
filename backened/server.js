

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postRoutes = require('./src/routes/postRoutes');

const authRouter = require('./src/routes/authRoutes');
const connection = require('./src/config/db'); // 👈 MongoDB connection import

const app = express();
const port = process.env.PORT || 8000;

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  // origin: 'https://hackathon-smoky-psi.vercel.app', // frontend ka URL (Vite dev server)
  credentials: true               // agar cookies/tokens bhejne ho to
}));

// ✅ Connect to MongoDB
connection();

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// ✅ Routes
app.use('/auth', authRouter);
app.use('/api/posts', postRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

