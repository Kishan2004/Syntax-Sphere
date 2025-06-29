import { Course } from "../Models/course.model.js";
import { Lecture } from "../Models/course.Lecture.js";
import { deleteMedia, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      category,
      subTitle,
      description,
      courseLevel,
      coursePrice,
    } = req.body;

    if (!courseTitle || !category) {
      return res
        .status(400)
        .json({ message: "Course title and category are required" });
    }

    const course = await Course.create({
      CourseTitle: courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      creator: req.id,
    });

    return res
      .status(201)
      .json({ message: "Course created successfully", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course", error: error.message });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ courses: [], message: "No courses found" });
    }
    return res
      .status(200)
      .json({ message: "Courses fetched successfully", courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses", error: error.message });
  }
};

export const editCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      category,
      coursePrice,
      isPublished,
      courseLevel,
    } = req.body;
    const thumbnail = req.file;
    const courseId = req.params.id;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        await deleteMedia(publicId);
      }
      const uploaded = await uploadMedia(thumbnail.path, "courseThumbnails");
      courseThumbnail = uploaded.secure_url;
    }

    const updateData = {
      CourseTitle: courseTitle,
      subTitle,
      description,
      category,
      coursePrice: Number(coursePrice),
      courseLevel,
      isPublished: isPublished === "true" || isPublished === true,
      courseThumbnail: courseThumbnail || course.courseThumbnail,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Course updated successfully", course });
  } catch (error) {
    console.error("Edit course error:", error);
    res
      .status(500)
      .json({ message: "Error editing course", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate(
      "creator",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Course fetched successfully", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching course", error: error.message });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params; // ✅ Fixed here

    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Lecture title and courseId are required" });
    }

    // Create Lecture
    const lecture = await Lecture.create({ lectureTitle });

    // Associate with Course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.error("Create lecture error:", error);
    res.status(500).json({
      message: "Error creating lecture",
      error: error.message,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const  courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Lectures fetched successfully",
      lectures: course.lectures,
    });
  }catch (error) {
    console.error("Get lecture by ID error:", error);
    res.status(500).json({
      message: "Error fetching lecture",
      error: error.message,
    });
  }

}