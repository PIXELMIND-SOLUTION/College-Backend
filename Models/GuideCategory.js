import mongoose from 'mongoose';

const guideCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
}, { timestamps: true });

const GuideCategory = mongoose.model('GuideCategory', guideCategorySchema);
export default GuideCategory;