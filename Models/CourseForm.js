import mongoose from 'mongoose';

const courseFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  education: {
    type: String,
    required: [true, 'Education is required'],
    enum: ['10th', '12th', 'Graduation', 'Post Graduation', 'Diploma', 'Other'],
    trim: true
  },
  previousCourse: {
    type: String,
    required: [true, 'Previous course is required'],
    trim: true
  },
  chooseCourse: {
    type: String,
    required: [true, 'Please select a course'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'enrolled', 'rejected'],
    default: 'pending'
  },
  remarks: {
    type: String,
    default: ''
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create indexes for faster queries
courseFormSchema.index({ mobile: 1 });
courseFormSchema.index({ email: 1 });
courseFormSchema.index({ status: 1 });
courseFormSchema.index({ createdAt: -1 });



const CourseForm = mongoose.model('CourseForm', courseFormSchema);

export default CourseForm;