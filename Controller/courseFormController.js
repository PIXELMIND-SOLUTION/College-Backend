import mongoose from 'mongoose';
import  CourseForm  from '../Models/CourseForm.js';



// Submit new course form
export const submitCourseForm = async (req, res) => {
  try {
    const { name, mobile, email, education, previousCourse, chooseCourse } = req.body;

    // Validate required fields
    if (!name || !mobile || !email || !education || !previousCourse || !chooseCourse) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, mobile, email, education, previousCourse, chooseCourse"
      });
    }

    // Validate mobile number (10 digits)
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

    // Check if form already submitted with same email or mobile
    const existingSubmission = await CourseForm.findOne({
      $or: [{ email }, { mobile }],
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    if (existingSubmission) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a form in the last 24 hours. Please try again later."
      });
    }

    // Create new course form submission
    const courseForm = new CourseForm({
      name,
      mobile,
      email,
      education,
      previousCourse,
      chooseCourse
    });

    await courseForm.save();

    res.status(201).json({
      success: true,
      message: "Course form submitted successfully! Our team will contact you soon.",
      data: {
        id: courseForm._id,
        name: courseForm.name,
        email: courseForm.email,
        mobile: courseForm.mobile,
        education: courseForm.education,
        previousCourse: courseForm.previousCourse,
        chooseCourse: courseForm.chooseCourse,
        status: courseForm.status,
        submittedAt: courseForm.submittedAt
      }
    });

  } catch (error) {
    console.error("Error submitting course form:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};

// Get all form submissions (Admin only)
export const getAllSubmissions = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status) filter.status = status;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const submissions = await CourseForm.find(filter)
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
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    
    const submission = await CourseForm.findById(id);
    
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
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    
    const submissions = await CourseForm.find({ email }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions by email:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    
    const submissions = await CourseForm.find({ mobile }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
    
  } catch (error) {
    console.error("Error fetching submissions by mobile:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
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
    );
    
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

// Get statistics (Admin only)
export const getFormStatistics = async (req, res) => {
  try {
    const total = await CourseForm.countDocuments();
    const pending = await CourseForm.countDocuments({ status: 'pending' });
    const contacted = await CourseForm.countDocuments({ status: 'contacted' });
    const enrolled = await CourseForm.countDocuments({ status: 'enrolled' });
    const rejected = await CourseForm.countDocuments({ status: 'rejected' });
    
    const educationStats = await CourseForm.aggregate([
      { $group: { _id: '$education', count: { $sum: 1 } } }
    ]);
    
    const courseStats = await CourseForm.aggregate([
      { $group: { _id: '$chooseCourse', count: { $sum: 1 } } }
    ]);
    
    res.status(200).json({
      success: true,
      statistics: {
        total,
        pending,
        contacted,
        enrolled,
        rejected,
        educationStats,
        courseStats
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