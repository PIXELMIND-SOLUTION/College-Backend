import express from "express";
import { registerAdmin, loginAdmin, getAllUsers, updateUser, deleteUser, getAllSubmittedForms, updateFormStatus, deleteSubmittedForm, getAdminProfile, getDashboardStats } from "../Controller/adminController.js";

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


export default router;
