import express from 'express';
import {
  submitCourseForm,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByEmail,
  getSubmissionsByMobile,
  getSubmissionsByCourse,
  getSubmissionsByUser,
  updateSubmissionStatus,
  deleteSubmission,
  getFormStatistics
} from '../Controller/courseFormController.js';

const router = express.Router();

// Public routes (requires authentication - user must be logged in)
router.post('/submit', submitCourseForm);

// User routes (get user's own submissions)
router.get('/my-submissions/:userId', getSubmissionsByUser);

// Admin routes
router.get('/submissions/all', getAllSubmissions);
router.get('/submissions/statistics', getFormStatistics);
router.get('/submissions/by-email', getSubmissionsByEmail);
router.get('/submissions/by-mobile', getSubmissionsByMobile);
router.get('/submissions/by-course/:courseId', getSubmissionsByCourse);
router.get('/submissions/:id', getSubmissionById);
router.put('/submissions/:id/status', updateSubmissionStatus);
router.delete('/submissions/:id', deleteSubmission);

export default router;