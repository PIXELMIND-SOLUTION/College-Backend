import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
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
    default: 'https://via.placeholder.com/150',
  },
  duration: {
    type: String,
    required: [true, 'Course duration is required'],
    trim: true
  },
  tag: {
    type: String,
    trim: true,
    default: ''
  },
  about: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }],
  careerScope: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

courseSchema.index({ tag: 1 });
courseSchema.index({ isActive: 1 });

const Course = mongoose.model('Course', courseSchema);
export default Course;