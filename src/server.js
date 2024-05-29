import express from 'express';
import cors from 'cors';
import rateLimit from "express-rate-limit";
import morgan from 'morgan';
import helmet from 'helmet';
import validator from 'validator';
import Email from './models/Email.js';
import mongoose from 'mongoose';
const port = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost:27017/GUAIS')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files from the 'src' directory
app.use(express.static(process.cwd()));

app.post('/submit-email', async (req, res) => {
  const email = req.body.email.toLowerCase();

  // Validate the email address
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Check if the email already exists
  const existingEmail = await Email.findOne({ address: email });
  if (existingEmail) {
    return res.status(400).json({ message: 'Email already subscribed' });
  }

  // Store the email address
  const newEmail = new Email({ address: email });
  try {
    // ... rest of your code
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// ... rest of your code