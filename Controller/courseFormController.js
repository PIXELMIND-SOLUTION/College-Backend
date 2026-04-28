import mongoose from 'mongoose';
import CourseForm from '../Models/CourseForm.js';
import Course from '../Models/Course.js';
import User from '../Models/User.js';

// Submit course form with user ID
export const submitCourseForm = async (req, res) => {
  try {
    const { userId, name, mobile, email, courseId, qualification, message } = req.body;

    // Validate required fields
    if (!userId || !name || !mobile || !email || !courseId || !qualification) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: userId, name, mobile, email, courseId, qualification"
      });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please login again."
      });
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number"
      });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Validate courseId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format"
      });
    }

    // Verify course exists and is active
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Selected course not found"
      });
    }

    if (!course.isActive) {
      return res.status(400).json({
        success: false,
        message: "Selected course is currently not available"
      });
    }

    // Check for duplicate submission by same user in last 24 hours
    const existingSubmission = await CourseForm.findOne({
      userId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a form in the last 24 hours. Please try again later."
      });
    }

    // Create new course form submission
    const courseForm = new CourseForm({
      userId,
      name,
      mobile,
      email,
      courseId,
      qualification,
      message: message || ''
    });

    await courseForm.save();

    // Populate course and user details for response
    await courseForm.populate('courseId', 'name duration tag image');
    await courseForm.populate('userId', 'name email mobile');

    res.status(201).json({
      success: true,
      message: "Course form submitted successfully! Our team will contact you soon.",
      data: {
        id: courseForm._id,
        user: {
          id: courseForm.userId._id,
          name: courseForm.userId.name,
          email: courseForm.userId.email,
          mobile: courseForm.userId.mobile
        },
        course: {
          id: courseForm.courseId._id,
          name: courseForm.courseId.name,
          duration: courseForm.courseId.duration,
          tag: courseForm.courseId.tag
        },
        qualification: courseForm.qualification,
        message: courseForm.message,
        status: courseForm.status,
        submittedAt: courseForm.submittedAt
      }
    });

  } catch (error) {
    console.error("Error submitting course form:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get submissions by user ID
export const getSubmissionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    const submissions = await CourseForm.find({ userId })
      .populate('courseId', 'name duration tag image description')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      },
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all form submissions (Admin) - with user filter
export const getAllSubmissions = async (req, res) => {
  try {
    const { status, courseId, userId, page = 1, limit = 10 } = req.query;
    let filter = {};
    
    if (status) filter.status = status;
    if (courseId && mongoose.Types.ObjectId.isValid(courseId)) filter.courseId = courseId;
    if (userId && mongoose.Types.ObjectId.isValid(userId)) filter.userId = userId;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const submissions = await CourseForm.find(filter)
      .populate('courseId', 'name duration tag image')
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await CourseForm.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format"
      });
    }
    
    const submission = await CourseForm.findById(id)
      .populate('courseId', 'name duration tag description careerScope features')
      .populate('userId', 'name email mobile aadhaarCardNumber');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found"
      });
    }
    
    res.status(200).json({
      success: true,
      submission
    });
    
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get submissions by email
export const getSubmissionsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    
    const submissions = await CourseForm.find({ email })
      .populate('courseId', 'name duration tag')
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions by email:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get submissions by mobile
export const getSubmissionsByMobile = async (req, res) => {
  try {
    const { mobile } = req.query;
    
    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required"
      });
    }
    
    const submissions = await CourseForm.find({ mobile })
      .populate('courseId', 'name duration tag')
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions by mobile:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get submissions by course
export const getSubmissionsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID format"
      });
    }
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }
    
    const submissions = await CourseForm.find({ courseId })
      .populate('courseId', 'name duration tag')
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      course: {
        id: course._id,
        name: course.name
      },
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions by course:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update submission status (Admin only)
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format"
      });
    }
    
    const validStatuses = ['pending', 'contacted', 'enrolled', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    const updateData = {};
    if (status) updateData.status = status;
    if (remarks) updateData.remarks = remarks;
    
    const submission = await CourseForm.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('courseId', 'name').populate('userId', 'name email mobile');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Submission status updated successfully",
      submission
    });
    
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete submission (Admin only)
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission ID format"
      });
    }
    
    const submission = await CourseForm.findByIdAndDelete(id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Submission deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get form statistics (Admin only)
export const getFormStatistics = async (req, res) => {
  try {
    const total = await CourseForm.countDocuments();
    const pending = await CourseForm.countDocuments({ status: 'pending' });
    const contacted = await CourseForm.countDocuments({ status: 'contacted' });
    const enrolled = await CourseForm.countDocuments({ status: 'enrolled' });
    const rejected = await CourseForm.countDocuments({ status: 'rejected' });
    
    const courseStats = await CourseForm.aggregate([
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'courseInfo'
        }
      },
      { $unwind: '$courseInfo' },
      {
        $group: {
          _id: '$courseInfo.name',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    const userStats = await CourseForm.aggregate([
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.status(200).json({
      success: true,
      statistics: {
        total,
        pending,
        contacted,
        enrolled,
        rejected,
        courseStats,
        topUsers: userStats
      }
    });
    
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};