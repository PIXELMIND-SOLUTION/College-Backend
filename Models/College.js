// import mongoose from 'mongoose';

// const collegeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     trim: true,
//   },
//   location: {
//     type: String,
//   },
//   image: {
//     type: String, // Cloudinary secure URL
//   },
// }, { timestamps: true });

// const College = mongoose.model('College', collegeSchema);
// export default College;

import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // Image is now required
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GuideCategory',
    required: true,
    index: true
  },
  description: {
    type: String,
    default: ''
  },
  ranking: {
    type: Number,
    default: 0
  },
  courses: [{
    name: String,
    duration: String,
    fees: String
  }],
  website: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Create compound index for faster queries
collegeSchema.index({ categoryId: 1, ranking: 1 });
collegeSchema.index({ categoryId: 1, name: 1 });

const College = mongoose.model('College', collegeSchema);
export default College;