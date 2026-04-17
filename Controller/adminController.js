import Admin from "../Models/Admin.js";
import Banner from "../Models/Banner.js";
import College from "../Models/College.js";
import Form from "../Models/Form.js";
import GuideCategory from "../Models/GuideCategory.js";
import GuideContent from "../Models/GuideContent.js";
import Qna from "../Models/Qna.js";
import User from "../Models/User.js";
import mongoose from 'mongoose';


/**
 * ADMIN REGISTER
 */
export const registerAdmin = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({
      name,
      email,
      mobile,
      password, // ❌ no bcrypt
    });

    await admin.save();

    return res.status(201).json({
      message: "Admin registered successfully",
      admin,
    });

  } catch (err) {
    console.error("Register Admin Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN LOGIN
 */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // ❌ plain password comparison
    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Admin login successful",
      admin,
    });

  } catch (err) {
    console.error("Login Admin Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      aadhaarCardNumber,
      password,
      confirmPassword,
    } = req.body;

    if (password && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        aadhaarCardNumber,
        password,
        confirmPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// GET /api/forms/all
export const getAllSubmittedForms = async (req, res) => {
  try {
    const forms = await Form.find()
      .populate("student", "name email mobile") // user populate
      .populate("college", "name location");    // college populate

    if (!forms || forms.length === 0) {
      return res.status(404).json({
        message: "No forms found"
      });
    }

    return res.status(200).json({
      message: "All submitted forms fetched successfully",
      total: forms.length,
      forms
    });

  } catch (error) {
    console.error("Error fetching submitted forms:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};


// PUT /api/forms/update-status/:formId
export const updateFormStatus = async (req, res) => {
  try {
    const { formId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { status },
      { new: true }
    )
      .populate("student", "name email")
      .populate("college", "name");

    if (!updatedForm) {
      return res.status(404).json({
        message: "Form not found"
      });
    }

    return res.status(200).json({
      message: "Form status updated successfully",
      form: updatedForm
    });

  } catch (error) {
    console.error("Error updating form status:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};



// DELETE /api/forms/delete/:formId
export const deleteSubmittedForm = async (req, res) => {
  try {
    const { formId } = req.params;

    const deletedForm = await Form.findByIdAndDelete(formId);

    if (!deletedForm) {
      return res.status(404).json({
        message: "Form not found"
      });
    }

    return res.status(200).json({
      message: "Form deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting form:", error);
    return res.status(500).json({
      message: "Server error"
    });
  }
};



// GET Admin Profile by ID
export const getAdminProfile = async (req, res) => {
  const { adminId } = req.params;

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({
      message: "Admin profile fetched successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      },
    });
  } catch (err) {
    console.error("Get Admin Profile Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// GET Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    // Total students (users)
    const totalStudents = await User.countDocuments();

    // Total colleges
    const totalColleges = await College.countDocuments();

    // Total banners
    const totalBanners = await Banner.countDocuments();

    // Total QnAs
    const totalQnas = await Qna.countDocuments();

    // New users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const newUsers = await User.find({ createdAt: { $gte: sevenDaysAgo } }).select("name email createdAt");

    // Top colleges based on number of submitted forms
    const topCollegesAggregation = await Form.aggregate([
      {
        $group: {
          _id: "$college",
          totalForms: { $sum: 1 }
        }
      },
      { $sort: { totalForms: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "colleges", // MongoDB collection name (make sure it matches)
          localField: "_id",
          foreignField: "_id",
          as: "collegeInfo"
        }
      },
      { $unwind: "$collegeInfo" },
      {
        $project: {
          _id: 0,
          collegeId: "$collegeInfo._id",
          name: "$collegeInfo.name",
          location: "$collegeInfo.location",
          image: "$collegeInfo.image",
          totalForms: 1
        }
      }
    ]);

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      stats: {
        totalStudents,
        totalColleges,
        totalBanners,
        totalQnas,
        newUsers,
        topColleges: topCollegesAggregation
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await GuideCategory.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await GuideCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }
    const existing = await GuideCategory.findOne({ name });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    const category = new GuideCategory({ name });
    await category.save();
    res.status(201).json({ success: true, message: 'Category created', category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }
    const category = await GuideCategory.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category updated', category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete category (and all its guide contents)
export const deleteCategory = async (req, res) => {
  try {
    const category = await GuideCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    // Delete all guide contents under this category
    await GuideContent.deleteMany({ categoryId: req.params.id });
    res.status(200).json({ success: true, message: 'Category and its contents deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CONTENT CONTROLLERS ====================

// Get all guide contents (optionally filter by categoryId)
export const getAllContents = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = {};
    if (categoryId) filter.categoryId = categoryId;
    const contents = await GuideContent.find(filter)
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single content by ID
export const getContentById = async (req, res) => {
  try {
    const content = await GuideContent.findById(req.params.id).populate('categoryId', 'name');
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.status(200).json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new guide content
export const createContent = async (req, res) => {
  try {
    const { categoryId, question, answer, studyPoints, careerScope } = req.body;
    if (!categoryId || !question || !answer) {
      return res.status(400).json({ success: false, message: 'categoryId, question, answer are required' });
    }
    // Verify category exists
    const category = await GuideCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const newContent = new GuideContent({
      categoryId,
      question,
      answer,
      studyPoints: studyPoints || [],
      careerScope: careerScope || '',
    });
    await newContent.save();
    res.status(201).json({ success: true, message: 'Content created', content: newContent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update guide content
export const updateContent = async (req, res) => {
  try {
    const { question, answer, studyPoints, careerScope } = req.body;
    const content = await GuideContent.findByIdAndUpdate(
      req.params.id,
      { question, answer, studyPoints, careerScope },
      { new: true, runValidators: true }
    );
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.status(200).json({ success: true, message: 'Content updated', content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete guide content
export const deleteContent = async (req, res) => {
  try {
    const content = await GuideContent.findByIdAndDelete(req.params.id);
    if (!content) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.status(200).json({ success: true, message: 'Content deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get all guide contents (optionally filter by categoryId from query)
export const getAllContentsByCat = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = {};
    if (categoryId) {
      // Validate if categoryId is a valid ObjectId (optional but recommended)
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ success: false, message: 'Invalid category ID format' });
      }
      filter.categoryId = categoryId;
    }
    const contents = await GuideContent.find(filter)
      .populate('categoryId', 'name') // populate category name
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, contents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};