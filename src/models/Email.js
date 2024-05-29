import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
});

const Email = mongoose.model('Email', emailSchema);

export default Email;