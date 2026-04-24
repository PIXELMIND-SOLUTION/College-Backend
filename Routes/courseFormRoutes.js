import express from 'express';
import {
  submitCourseForm,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByEmail,
  getSubmissionsByMobile,
  updateSubmissionStatus,
  deleteSubmission,
  getFormStatistics
} from '../Controller/courseFormController.js';

const router = express.Router();


//user routes
router.post('/submit', submitCourseForm);

// Admin routes
router.get('/all', getAllSubmissions);
router.get('/statistics', getFormStatistics);
router.get('/by-email', getSubmissionsByEmail);
router.get('/by-mobile', getSubmissionsByMobile);
router.get('/:id', getSubmissionById);
router.put('/:id/status', updateSubmissionStatus);
router.delete('/:id', deleteSubmission);



export default router;