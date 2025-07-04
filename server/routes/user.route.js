import express from "express";
import {
    getUserProfile,
    login,
    logout,
    register,
    updateProfile, // Import the function here
} from "../controllers/user.controller.js";
import isAunthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/profile").get(isAunthenticated, getUserProfile);
router.route("/profile/update").put(isAunthenticated, upload.single("profilePhoto") ,updateProfile);

export default router;
