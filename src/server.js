import express from 'express';
import validator from 'validator';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://amosenewton:QocE7Br0E7ElcoTc@guais.yoklg14.mongodb.net/?retryWrites=true&w=majority&appName=GUAIS', { useNewUrlParser: true, useUnifiedTopology: true });

const Email = mongoose.model('Email', new mongoose.Schema({
  address: String
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'src' directory
app.use(express.static(process.cwd()));

app.post('/submit-email', async (req, res) => {
  const email = req.body.email;

  // Validate the email address
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Store the email address
  const newEmail = new Email({ address: email });
  await newEmail.save();

  res.json({ message: 'Subscription successful!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});