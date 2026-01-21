import dotenv from 'dotenv';
import College from '../Models/College.js';
import Banner from '../Models/Banner.js';
import Qna from '../Models/Qna.js';
import cloudinary from '../config/cloudinary.js';


dotenv.config();

export const createCollege = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageFile = req.files.image;

    // ⬆️ Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      imageFile.tempFilePath,
      {
        folder: "colleges",
      }
    );

    const college = new College({
      name,
      location,
      image: uploadResult.secure_url, // ✅ cloudinary URL
    });

    await college.save();

    return res.status(201).json({
      message: "College created successfully",
      college,
    });

  } catch (error) {
    console.error("Error creating college:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    // 🔁 Update image only if new image provided
    if (req.files && req.files.image) {
      const imageFile = req.files.image;

      const uploadResult = await cloudinary.uploader.upload(
        imageFile.tempFilePath,
        {
          folder: "colleges",
        }
      );

      college.image = uploadResult.secure_url;
    }

    if (name) college.name = name;
    if (location) college.location = location;

    await college.save();

    return res.status(200).json({
      message: "College updated successfully",
      college,
    });

  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    return res.status(200).json({
      message: "College deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting college:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getAllColleges = async (req, res) => {
  try {
    // 📦 Fetch all colleges, sorted by creation date (newest first)
    const colleges = await College.find().sort({ createdAt: -1 });

    // 🖼️ Fetch all banners
    const banners = await Banner.find().sort({ createdAt: -1 });

    // ✅ Send both in response
    res.status(200).json({
      message: 'Colleges and banners fetched successfully',
      colleges,
      banners
    });

  } catch (error) {
    console.error('Error fetching colleges and banners:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSingleCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.status(200).json(college);
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const createBanner = async (req, res) => {
  try {
    // ❌ images body se nahi
    if (!req.files || !req.files.images) {
      return res.status(400).json({ message: "At least one image file is required" });
    }

    let imagesFiles = req.files.images;

    // 👉 single file aaye to array bana do
    if (!Array.isArray(imagesFiles)) {
      imagesFiles = [imagesFiles];
    }

    const uploadedImages = [];

    // ⬆️ Upload all images to cloudinary
    for (const file of imagesFiles) {
      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "banners",
        }
      );

      uploadedImages.push(result.secure_url);
    }

    const banner = new Banner({
      images: uploadedImages,
    });

    await banner.save();

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

    // 🔁 If new images provided, replace old ones
    if (req.files && req.files.images) {
      let imagesFiles = req.files.images;

      if (!Array.isArray(imagesFiles)) {
        imagesFiles = [imagesFiles];
      }

      const uploadedImages = [];

      for (const file of imagesFiles) {
        const result = await cloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "banners",
          }
        );

        uploadedImages.push(result.secure_url);
      }

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
