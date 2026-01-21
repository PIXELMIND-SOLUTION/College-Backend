import express from 'express';
import {
  createBanner,
  createCollege,
  deleteBanner,
  deleteCollege,
  deleteQuestion,
  getAllBanners,
  getAllColleges,
  getAllQuestions,
  getSingleCollege,
  postQuestion,
  updateBanner,
  updateCollege,
  updateQuestion
} from '../Controller/collegeController.js';

const router = express.Router()

router.post('/create-college', createCollege);
router.put("/updatecollege/:id", updateCollege);
router.delete("/deletecollege/:id", deleteCollege);
router.get('/getallcolleges', getAllColleges);
router.get('/getsinglecollege/:id', getSingleCollege);
router.post('/createbanner', createBanner);
router.post('/postqna', postQuestion);
router.get('/allqna', getAllQuestions);  // This is the new route
router.put('/updateqna/:id', updateQuestion);
router.delete('/deleteqna/:id', deleteQuestion);
router.put('/updatebanner/:id', updateBanner);
router.delete('/deletebanner/:id', deleteBanner);
router.post('/getallbanners', getAllBanners);



export default router;
