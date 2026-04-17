import express from "express";
import { registerAdmin, loginAdmin, getAllUsers, updateUser, deleteUser, getAllSubmittedForms, updateFormStatus, deleteSubmittedForm, getAdminProfile, getDashboardStats, getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory, getAllContents, createContent, getContentById, updateContent, deleteContent, getAllContentsByCat } from "../Controller/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.get("/allusers", getAllUsers);
router.put("/updateusers/:id", updateUser);
router.delete("/deleteusers/:id", deleteUser);

router.get("/submittedforms", getAllSubmittedForms);
router.put("/updateform-status/:formId", updateFormStatus);
router.delete("/deleteform/:formId", deleteSubmittedForm);

router.get("/getprofile/:adminId", getAdminProfile);
router.get("/dashboard", getDashboardStats);


// ==================== CATEGORY ROUTES ====================
router.get("/guide-categories",  getAllCategories);
router.post("/guide-categories",  createCategory);
router.get("/guide-categories/:id",  getCategoryById);
router.put("/guide-categories/:id",  updateCategory);
router.delete("/guide-categories/:id",  deleteCategory);

// ==================== CONTENT ROUTES ====================
router.get("/guide-contents",  getAllContents);
router.post("/guide-contents", createContent);
router.get("/guide-contents/:id", getContentById);
router.put("/guide-contents/:id", updateContent);
router.delete("/guide-contents/:id",  deleteContent);

router.get("/guidecontentsbycat", getAllContentsByCat);


export default router;
