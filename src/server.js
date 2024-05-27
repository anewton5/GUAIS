import express from 'express';
import validator from 'validator';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://amosenewton:mIvM4NS52tPDcVZ9@guais.yoklg14.mongodb.net/?retryWrites=true&w=majority&appName=GUAIS');

const Email = mongoose.model('Email', new mongoose.Schema({
  address: { type: String, unique: true }
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    await newEmail.save();
    res.json({ message: 'Subscription successful!' });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});