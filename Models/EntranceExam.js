import mongoose from 'mongoose';

const entranceExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exam title is required'],
    unique: true,
    trim: true
  },
  subtitle: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x200',
  },
  about: {
    type: String,
    required: [true, 'About section is required'],
    trim: true
  },
  eligibility: {
    type: String,
    required: [true, 'Eligibility criteria is required'],
    trim: true
  },
  applicationProcess: [{
    type: String,
    default: '',
    trim: true
  }],
  examPattern: {
    type: String,
    default: '',
    trim: true
  },
  importantDates: {
    type: String,
    default: '',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Create indexes for faster queries
entranceExamSchema.index({ title: 1 });
entranceExamSchema.index({ isActive: 1 });
entranceExamSchema.index({ createdAt: -1 });

const EntranceExam = mongoose.model('EntranceExam', entranceExamSchema);
export default EntranceExam;