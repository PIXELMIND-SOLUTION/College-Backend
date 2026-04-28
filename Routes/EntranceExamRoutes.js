import express from 'express';
import {
  createEntranceExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  toggleExamStatus
} from '../Controller/entranceExamController.js';

const router = express.Router();

// Admin routes
router.post('/create', createEntranceExam);
router.put('/update/:id', updateExam);
router.delete('/delete/:id', deleteExam);
router.patch('/toggle-status/:id', toggleExamStatus);

// Public routes
router.get('/all', getAllExams);
router.get('/:id', getExamById);

export default router;