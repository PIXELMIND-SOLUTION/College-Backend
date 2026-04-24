    import mongoose from "mongoose";

    const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'],
        unique: true,
        trim: true
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
    isActive: {
        type: Boolean,
        default: true
    }
    }, { timestamps: true });

    const Course = mongoose.model('Course', courseSchema);
    export default Course;