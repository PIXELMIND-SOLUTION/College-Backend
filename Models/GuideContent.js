import mongoose from 'mongoose';

const guideContentSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GuideCategory',
  },
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
  studyPoints: {
    type: [String],
    default: [],
  },
  careerScope: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const GuideContent = mongoose.model('GuideContent', guideContentSchema);
export default GuideContent;