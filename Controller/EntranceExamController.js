import mongoose from 'mongoose';
import EntranceExam from '../Models/EntranceExam.js';

const BASE_URL = "http://31.97.206.144:4063";

// Create new entrance exam
export const createEntranceExam = async (req, res) => {
  try {
    const { 
      title, 
      subtitle, 
      about, 
      eligibility, 
      applicationProcess, 
      examPattern, 
      importantDates, 
      image 
    } = req.body;

    // Validate required fields
    if (!title || !about || !eligibility) {
      return res.status(400).json({
        success: false,
        message: "Title, about, and eligibility are required fields"
      });
    }

    // Check if exam already exists
    const existingExam = await EntranceExam.findOne({ title });
    if (existingExam) {
      return res.status(400).json({
        success: false,
        message: `Entrance exam '${title}' already exists`
      });
    }

    // Handle image upload
    let imageUrl = 'https://via.placeholder.com/300x200';
    
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const fileName = Date.now() + "-" + imageFile.name.replace(/\s/g, '_');
      const uploadPath = `uploads/exams/${fileName}`;
      await imageFile.mv(uploadPath);
      imageUrl = `${BASE_URL}/uploads/exams/${fileName}`;
    } 
    else if (image) {
      imageUrl = image;
    }

    // Handle arrays (if sent as JSON string)
    let applicationProcessArray = [];
    if (applicationProcess) {
      applicationProcessArray = typeof applicationProcess === 'string' 
        ? JSON.parse(applicationProcess) 
        : applicationProcess;
    }

    const exam = new EntranceExam({
      title,
      subtitle: subtitle || '',
      image: imageUrl,
      about,
      eligibility,
      applicationProcess: applicationProcessArray,
      examPattern: examPattern || '',
      importantDates: importantDates || '',
    });

    await exam.save();

    res.status(201).json({
      success: true,
      message: "Entrance exam created successfully",
      exam
    });

  } catch (error) {
    console.error("Error creating entrance exam:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all entrance exams
export const getAllExams = async (req, res) => {
  try {
    const { search, isActive, limit } = req.query;
    let filter = {};
    
    // Filter by active status (uses isActive index)
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    } else {
      filter.isActive = true;
    }
    
    // Search by title (uses title index)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    
    let query = EntranceExam.find(filter);
    
    // Sort by createdAt (uses createdAt index)
    query = query.sort({ createdAt: -1 });
    
    // Apply limit if provided
    if (limit && !isNaN(limit)) {
      query = query.limit(parseInt(limit));
    }
    
    const exams = await query;
    
    res.status(200).json({
      success: true,
      count: exams.length,
      exams
    });
    
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single exam by ID
export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID format"
      });
    }
    
    const exam = await EntranceExam.findById(id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Entrance exam not found"
      });
    }
    
    res.status(200).json({
      success: true,
      exam
    });
    
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update entrance exam
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID format"
      });
    }
    
    const exam = await EntranceExam.findById(id);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Entrance exam not found"
      });
    }
    
    // Handle image upload if new file provided
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const fileName = Date.now() + "-" + imageFile.name.replace(/\s/g, '_');
      const uploadPath = `uploads/exams/${fileName}`;
      await imageFile.mv(uploadPath);
      updateData.image = `${BASE_URL}/uploads/exams/${fileName}`;
    }
    
    // Parse applicationProcess if sent as JSON string
    if (updateData.applicationProcess && typeof updateData.applicationProcess === 'string') {
      updateData.applicationProcess = JSON.parse(updateData.applicationProcess);
    }
    
    const updatedExam = await EntranceExam.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Entrance exam updated successfully",
      exam: updatedExam
    });
    
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete entrance exam
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID format"
      });
    }
    
    const exam = await EntranceExam.findByIdAndDelete(id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Entrance exam not found"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Entrance exam deleted successfully"
    });
    
  } catch (error) {
    console.error("Error deleting exam:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle exam status (activate/deactivate)
export const toggleExamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam ID format"
      });
    }
    
    const exam = await EntranceExam.findById(id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Entrance exam not found"
      });
    }
    
    exam.isActive = !exam.isActive;
    await exam.save();
    
    res.status(200).json({
      success: true,
      message: `Exam ${exam.isActive ? 'activated' : 'deactivated'} successfully`,
      exam
    });
    
  } catch (error) {
    console.error("Error toggling exam status:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};