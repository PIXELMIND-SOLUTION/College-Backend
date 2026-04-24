// import dotenv from 'dotenv';
// import College from '../Models/College.js';
// import Banner from '../Models/Banner.js';
// import Qna from '../Models/Qna.js';
// import GuideCategory from '../Models/GuideCategory.js';
// import cloudinary from '../config/cloudinary.js';


// dotenv.config();

// export const createCollege = async (req, res) => {
//   try {
//     const { name, location } = req.body;

//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ message: "Image file is required" });
//     }

//     const imageFile = req.files.image;

//     const fileName = Date.now() + "-" + imageFile.name;
//     const uploadPath = `uploads/colleges/${fileName}`;

//     // save locally
//     await imageFile.mv(uploadPath);

//     const imageUrl = `${BASE_URL}/uploads/colleges/${fileName}`;

//     const college = new College({
//       name,
//       location,
//       image: imageUrl,
//     });

//     await college.save();

//     return res.status(201).json({
//       message: "College created successfully",
//       college,
//     });

//   } catch (error) {
//     console.error("Error creating college:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export const updateCollege = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, location } = req.body;

//     const college = await College.findById(id);

//     if (!college) {
//       return res.status(404).json({ message: "College not found" });
//     }

//     // 🔁 Update image if new file provided
//     if (req.files && req.files.image) {
//       const imageFile = req.files.image;

//       const fileName = Date.now() + "-" + imageFile.name;
//       const uploadPath = `uploads/colleges/${fileName}`;

//       await imageFile.mv(uploadPath);

//       college.image = `${BASE_URL}/uploads/colleges/${fileName}`;
//     }

//     if (name) college.name = name;
//     if (location) college.location = location;

//     await college.save();

//     return res.status(200).json({
//       message: "College updated successfully",
//       college,
//     });

//   } catch (error) {
//     console.error("Error updating college:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteCollege = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedCollege = await College.findByIdAndDelete(id);

//     if (!deletedCollege) {
//       return res.status(404).json({ message: "College not found" });
//     }

//     return res.status(200).json({
//       message: "College deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting college:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };



// export const getAllColleges = async (req, res) => {
//   try {
//     // 📦 Fetch all colleges, sorted by creation date (newest first)
//     const colleges = await College.find().sort({ createdAt: -1 });

//     // 🖼️ Fetch all banners
//     const banners = await Banner.find().sort({ createdAt: -1 });

//     // ✅ Send both in response
//     res.status(200).json({
//       message: 'Colleges and banners fetched successfully',
//       colleges,
//       banners
//     });

//   } catch (error) {
//     console.error('Error fetching colleges and banners:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getSingleCollege = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const college = await College.findById(id);

//     if (!college) {
//       return res.status(404).json({ message: 'College not found' });
//     }

//     res.status(200).json(college);
//   } catch (error) {
//     console.error('Error fetching college:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

//     const BASE_URL = "http://31.97.206.144:4063";


// export const createBanner = async (req, res) => {
//   try {
//     if (!req.files || !req.files.images) {
//       return res.status(400).json({
//         message: "At least one image file is required"
//       });
//     }

//     let imagesFiles = req.files.images;

//     if (!Array.isArray(imagesFiles)) {
//       imagesFiles = [imagesFiles];
//     }

//     const uploadedImages = [];

//     for (const file of imagesFiles) {
//       // unique filename
//       const fileName = Date.now() + "-" + file.name;

//       const uploadPath = `uploads/banners/${fileName}`;

//       // move file to folder
//       await file.mv(uploadPath);

//       const imageUrl = `${BASE_URL}/uploads/banners/${fileName}`;
//       uploadedImages.push(imageUrl);
//     }

//     const banner = await Banner.create({
//       images: uploadedImages,
//     });

//     return res.status(201).json({
//       message: "Banner created successfully",
//       banner,
//     });

//   } catch (error) {
//     console.error("Error creating banner:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const updateBanner = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const banner = await Banner.findById(id);

//     if (!banner) {
//       return res.status(404).json({ message: "Banner not found" });
//     }

//     // 🔁 If new images provided → replace old ones
//     if (req.files && req.files.images) {
//       let imagesFiles = req.files.images;

//       if (!Array.isArray(imagesFiles)) {
//         imagesFiles = [imagesFiles];
//       }

//       const uploadedImages = [];

//       for (const file of imagesFiles) {
//         // unique file name
//         const fileName = Date.now() + "-" + file.name;

//         const uploadPath = `uploads/banners/${fileName}`;

//         // save file locally
//         await file.mv(uploadPath);

//         const imageUrl = `${BASE_URL}/uploads/banners/${fileName}`;

//         uploadedImages.push(imageUrl);
//       }

//       // (optional) old images delete logic can be added later
//       banner.images = uploadedImages;
//     }

//     await banner.save();

//     return res.status(200).json({
//       message: "Banner updated successfully",
//       banner,
//     });

//   } catch (error) {
//     console.error("Error updating banner:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const deleteBanner = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedBanner = await Banner.findByIdAndDelete(id);

//     if (!deletedBanner) {
//       return res.status(404).json({ message: 'Banner not found' });
//     }

//     return res.status(200).json({
//       message: 'Banner deleted successfully',
//     });

//   } catch (error) {
//     console.error('Error deleting banner:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// export const getAllBanners = async (req, res) => {
//   try {
//     // 📦 Fetch all banners from the database
//     const banners = await Banner.find();

//     // ✅ Response
//     return res.status(200).json({
//       message: 'Banners fetched successfully',
//       banners,
//     });
//   } catch (error) {
//     console.error('Error fetching banners:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// // Post Question(s) API (POST /api/qna/post)
// export const postQuestion = async (req, res) => {
//   try {
//     const questionsData = req.body; // Get question(s) from request body

//     // Check if it's an array (multiple questions)
//     if (Array.isArray(questionsData) && questionsData.length > 0) {
//       // Handle multiple questions
//       const savedQnas = [];
//       for (let qna of questionsData) {
//         const { question, answer } = qna;

//         if (!question || !answer) {
//           continue; // Skip invalid question-answer pairs
//         }

//         const newQna = new Qna({ question, answer });

//         // Save each question-answer to the database
//         const saved = await newQna.save();
//         savedQnas.push(saved);
//       }

//       return res.status(201).json({
//         message: `${savedQnas.length} question(s) posted successfully`,
//         qnas: savedQnas, // Return list of saved QnA objects
//       });
//     }

//     // Handle single question
//     const { question, answer } = questionsData;

//     if (!question || !answer) {
//       return res.status(400).json({ message: 'Question and answer are required' });
//     }

//     const newQna = new Qna({ question, answer });

//     // Save single question-answer to the database
//     const savedQna = await newQna.save();

//     return res.status(201).json({
//       message: 'Question posted successfully',
//       qna: savedQna, // Return the created QnA object
//     });

//   } catch (error) {
//     console.error('Error posting question(s):', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Get All Questions API (GET /api/qna/all)
// export const getAllQuestions = async (req, res) => {
//   try {
//     // Fetch all questions from the database
//     const allQnas = await Qna.find();

//     // If no questions are found
//     if (allQnas.length === 0) {
//       return res.status(404).json({ message: 'No questions found' });
//     }

//     return res.status(200).json({
//       message: 'Questions fetched successfully',
//       qnas: allQnas, // Return the list of questions
//     });
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // Update Question API
// export const updateQuestion = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { question, answer } = req.body;

//     if (!question || !answer) {
//       return res.status(400).json({
//         message: "Question and answer are required",
//       });
//     }

//     const updatedQna = await Qna.findByIdAndUpdate(
//       id,
//       { question, answer },
//       { new: true }
//     );

//     if (!updatedQna) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     return res.status(200).json({
//       message: "Question updated successfully",
//       qna: updatedQna,
//     });

//   } catch (error) {
//     console.error("Error updating question:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// // Delete Question API
// export const deleteQuestion = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedQna = await Qna.findByIdAndDelete(id);

//     if (!deletedQna) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     return res.status(200).json({
//       message: "Question deleted successfully",
//     });

//   } catch (error) {
//     console.error("Error deleting question:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





import dotenv from 'dotenv';
import College from '../Models/College.js';
import mongoose from 'mongoose';
import Banner from '../Models/Banner.js';
import Qna from '../Models/Qna.js';
import GuideCategory from '../Models/GuideCategory.js';
import cloudinary from '../config/cloudinary.js';


dotenv.config();

const BASE_URL = "http://31.97.206.144:4063";

// Create college with guide category
export const createCollege = async (req, res) => {
  try {
    const { name, location, categoryId, description, ranking, courses, website, image } = req.body;

    // Validate required fields
    if (!name || !location || !categoryId) {
      return res.status(400).json({ 
        success: false,
        message: "Name, location, and categoryId are required" 
      });
    }

    // Check if image is provided (either as file upload or URL)
    let imageUrl = '';
    
    if (req.files && req.files.image) {
      // Handle file upload
      const imageFile = req.files.image;
      const fileName = Date.now() + "-" + imageFile.name;
      const uploadPath = `uploads/colleges/${fileName}`;
      await imageFile.mv(uploadPath);
      imageUrl = `${BASE_URL}/uploads/colleges/${fileName}`;
    } 
    else if (image) {
      // Handle image URL from JSON
      imageUrl = image;
    }
    else {
      return res.status(400).json({ 
        success: false,
        message: "Image is required (either as file upload or image URL)" 
      });
    }

    // Validate categoryId format
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid categoryId format" 
      });
    }

    // Verify category exists in GuideCategory
    const category = await GuideCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Guide category not found" 
      });
    }

    // Parse courses if provided as string
    let coursesArray = [];
    if (courses) {
      coursesArray = typeof courses === 'string' ? JSON.parse(courses) : courses;
    }

    const college = new College({
      name,
      location,
      categoryId,
      image: imageUrl,
      description: description || '',
      ranking: ranking || 0,
      courses: coursesArray,
      website: website || ''
    });

    await college.save();
    
    // Populate category details for response
    await college.populate('categoryId', 'name');

    return res.status(201).json({
      success: true,
      message: `College created successfully under ${category.name} category`,
      college,
    });

  } catch (error) {
    console.error("Error creating college:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get colleges by guide category ID
export const getCollegesByGuideCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Validate categoryId format
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid categoryId format" 
      });
    }
    
    // Verify category exists
    const category = await GuideCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Guide category not found" 
      });
    }
    
    const colleges = await College.find({ 
      categoryId, 
      isActive: true 
    })
    .populate('categoryId', 'name')
    .sort({ ranking: 1 });
    
    res.status(200).json({
      success: true,
      category: {
        id: category._id,
        name: category.name
      },
      count: colleges.length,
      colleges
    });
    
  } catch (error) {
    console.error('Error fetching colleges by category:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get colleges by guide category name (Doctor, Engineering)
export const getCollegesByCategoryName = async (req, res) => {
  try {
    const { categoryName } = req.query;
    
    console.log("Received categoryName:", categoryName); // Debug log
    
    if (!categoryName) {
      return res.status(400).json({ 
        success: false,
        message: "Category name is required. Please provide ?categoryName=Doctor" 
      });
    }
    // Find category by name (case insensitive)
    const category = await GuideCategory.findOne({ 
      name: { $regex: new RegExp(`^${categoryName}$`, 'i') } 
    });
    
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: `Category '${categoryName}' not found` 
      });
    }
    
    const colleges = await College.find({ 
      categoryId: category._id, 
      isActive: true 
    })
    .populate('categoryId', 'name')
    .sort({ ranking: 1 });
    
    res.status(200).json({
      success: true,
      category: {
        id: category._id,
        name: category.name
      },
      count: colleges.length,
      colleges
    });
    
  } catch (error) {
    console.error('Error fetching colleges by category name:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Get all colleges (optionally filtered by categoryId)
export const getAllColleges = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = { isActive: true };
    
    if (categoryId) {
      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.categoryId = categoryId;
      } else {
        return res.status(400).json({ 
          success: false,
          message: "Invalid categoryId format" 
        });
      }
    }
    
    const colleges = await College.find(filter)
      .populate('categoryId', 'name')
      .sort({ ranking: 1, createdAt: -1 });
      
    const banners = await Banner.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Colleges and banners fetched successfully',
      count: colleges.length,
      colleges,
      banners
    });

  } catch (error) {
    console.error('Error fetching colleges and banners:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Get complete category details with colleges and guide contents
export const getCompleteCategoryDetails = async (req, res) => {
  try {
    // Change this line - use req.query instead of req.params
    const { categoryId } = req.query;
    
    console.log("Received categoryId:", categoryId); // Debug log
    
    // Validate categoryId
    if (!categoryId) {
      return res.status(400).json({ 
        success: false,
        message: "Category ID is required. Please provide ?categoryId=your_category_id" 
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid categoryId format" 
      });
    }
    
    // Get category details
    const category = await GuideCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ 
        success: false,
        message: "Category not found" 
      });
    }
    
    // Get colleges for this category
    const colleges = await College.find({ 
      categoryId, 
      isActive: true 
    }).sort({ ranking: 1 });
    
    // Get guide contents for this category (if you have GuideContent model)
    let contents = [];
    if (req.app.locals.GuideContent) {
      contents = await req.app.locals.GuideContent.find({ categoryId })
        .sort({ createdAt: -1 });
    }
    
    res.status(200).json({
      success: true,
      category: {
        id: category._id,
        name: category.name,
        createdAt: category.createdAt
      },
      stats: {
        totalColleges: colleges.length,
        totalContents: contents.length
      },
      colleges,
      contents
    });
    
  } catch (error) {
    console.error('Error fetching category details:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update college
export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, categoryId, description, ranking, courses, website } = req.body;

    const college = await College.findById(id);
    if (!college) {
      return res.status(404).json({ success: false, message: "College not found" });
    }

    // If categoryId is being updated, verify new category exists
    if (categoryId && categoryId !== college.categoryId.toString()) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ success: false, message: "Invalid categoryId format" });
      }
      const category = await GuideCategory.findById(categoryId);
      if (!category) {
        return res.status(404).json({ success: false, message: "Guide category not found" });
      }
    }

    // Update image if new file provided
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const fileName = Date.now() + "-" + imageFile.name;
      const uploadPath = `uploads/colleges/${fileName}`;
      await imageFile.mv(uploadPath);
      college.image = `${BASE_URL}/uploads/colleges/${fileName}`;
    }

    // Update fields
    if (name) college.name = name;
    if (location) college.location = location;
    if (categoryId) college.categoryId = categoryId;
    if (description) college.description = description;
    if (ranking !== undefined) college.ranking = ranking;
    if (courses) college.courses = typeof courses === 'string' ? JSON.parse(courses) : courses;
    if (website) college.website = website;

    await college.save();
    await college.populate('categoryId', 'name');

    return res.status(200).json({
      success: true,
      message: "College updated successfully",
      college,
    });

  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Delete college
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return res.status(404).json({ success: false, message: "College not found" });
    }

    return res.status(200).json({
      success: true,
      message: "College deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get single college
export const getSingleCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findById(id).populate('categoryId', 'name');

    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    res.status(200).json({
      success: true,
      college
    });
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Get category statistics
export const getCategoryStatistics = async (req, res) => {
  try {
    const categories = await GuideCategory.find();
    const stats = [];
    
    for (const category of categories) {
      const collegeCount = await College.countDocuments({ 
        categoryId: category._id, 
        isActive: true 
      });
      stats.push({
        categoryId: category._id,
        categoryName: category.name,
        collegeCount
      });
    }
    
    res.status(200).json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Error fetching category statistics:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// export const getAllColleges = async (req, res) => {
//   try {
//     // 📦 Fetch all colleges, sorted by creation date (newest first)
//     const colleges = await College.find().sort({ createdAt: -1 });

//     // 🖼️ Fetch all banners
//     const banners = await Banner.find().sort({ createdAt: -1 });

//     // ✅ Send both in response
//     res.status(200).json({
//       message: 'Colleges and banners fetched successfully',
//       colleges,
//       banners
//     });

//   } catch (error) {
//     console.error('Error fetching colleges and banners:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




export const createBanner = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        message: "At least one image file is required"
      });
    }

    let imagesFiles = req.files.images;

    if (!Array.isArray(imagesFiles)) {
      imagesFiles = [imagesFiles];
    }

    const uploadedImages = [];

    for (const file of imagesFiles) {
      // unique filename
      const fileName = Date.now() + "-" + file.name;

      const uploadPath = `uploads/banners/${fileName}`;

      // move file to folder
      await file.mv(uploadPath);

      const imageUrl = `${BASE_URL}/uploads/banners/${fileName}`;
      uploadedImages.push(imageUrl);
    }

    const banner = await Banner.create({
      images: uploadedImages,
    });

    return res.status(201).json({
      message: "Banner created successfully",
      banner,
    });

  } catch (error) {
    console.error("Error creating banner:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // 🔁 If new images provided → replace old ones
    if (req.files && req.files.images) {
      let imagesFiles = req.files.images;

      if (!Array.isArray(imagesFiles)) {
        imagesFiles = [imagesFiles];
      }

      const uploadedImages = [];

      for (const file of imagesFiles) {
        // unique file name
        const fileName = Date.now() + "-" + file.name;

        const uploadPath = `uploads/banners/${fileName}`;

        // save file locally
        await file.mv(uploadPath);

        const imageUrl = `${BASE_URL}/uploads/banners/${fileName}`;

        uploadedImages.push(imageUrl);
      }

      // (optional) old images delete logic can be added later
      banner.images = uploadedImages;
    }

    await banner.save();

    return res.status(200).json({
      message: "Banner updated successfully",
      banner,
    });

  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    return res.status(200).json({
      message: 'Banner deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getAllBanners = async (req, res) => {
  try {
    // 📦 Fetch all banners from the database
    const banners = await Banner.find();

    // ✅ Response
    return res.status(200).json({
      message: 'Banners fetched successfully',
      banners,
    });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// Post Question(s) API (POST /api/qna/post)
export const postQuestion = async (req, res) => {
  try {
    const questionsData = req.body; // Get question(s) from request body

    // Check if it's an array (multiple questions)
    if (Array.isArray(questionsData) && questionsData.length > 0) {
      // Handle multiple questions
      const savedQnas = [];
      for (let qna of questionsData) {
        const { question, answer } = qna;

        if (!question || !answer) {
          continue; // Skip invalid question-answer pairs
        }

        const newQna = new Qna({ question, answer });

        // Save each question-answer to the database
        const saved = await newQna.save();
        savedQnas.push(saved);
      }

      return res.status(201).json({
        message: `${savedQnas.length} question(s) posted successfully`,
        qnas: savedQnas, // Return list of saved QnA objects
      });
    }

    // Handle single question
    const { question, answer } = questionsData;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const newQna = new Qna({ question, answer });

    // Save single question-answer to the database
    const savedQna = await newQna.save();

    return res.status(201).json({
      message: 'Question posted successfully',
      qna: savedQna, // Return the created QnA object
    });

  } catch (error) {
    console.error('Error posting question(s):', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get All Questions API (GET /api/qna/all)
export const getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const allQnas = await Qna.find();

    // If no questions are found
    if (allQnas.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    return res.status(200).json({
      message: 'Questions fetched successfully',
      qnas: allQnas, // Return the list of questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Update Question API
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required",
      });
    }

    const updatedQna = await Qna.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updatedQna) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      message: "Question updated successfully",
      qna: updatedQna,
    });

  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Delete Question API
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQna = await Qna.findByIdAndDelete(id);

    if (!deletedQna) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      message: "Question deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Server error" });
  }
};

