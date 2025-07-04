import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createCourse)
  .get(isAuthenticated, getCreatorCourses);

router
  .route("/:id")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);

router.route("/:id").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
export default router;
