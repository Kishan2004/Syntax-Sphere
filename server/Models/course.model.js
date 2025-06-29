import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  CourseTitle: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  coursePrice: {
    type: Number, 
    required: false,
  },
  courseType: {
    type: Number,
  },
  CourseThumbnail: {
    type: String,
  },
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  lectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lecture',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // ✅ timestamps, not "timestamp"

export const Course = mongoose.model('Course', coursesSchema);
