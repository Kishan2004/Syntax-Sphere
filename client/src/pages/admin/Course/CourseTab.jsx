import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import TiptapEditor from "@/components/CustomEditor";
import {
  useEditCourseMutation,
  useCreateCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const CourseTab = () => {
  const { courseId } = useParams();
  const isEditMode = courseId !== "create";

  const [editCourse, editStatus] = useEditCourseMutation();
  const [createCourse, createStatus] = useCreateCourseMutation();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: ""
  
  });
  const { data:courseByIdData, isLoading:courseByIdLoading } = useGetCourseByIdQuery(courseId);
  useEffect(() => {
    if(courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        title: course.CourseTitle,
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: "" // We will handle thumbnail separately
       
      });
    }
  },[courseByIdData])
  
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const isLoading = editStatus.isLoading || createStatus.isLoading;
  const isSuccess = editStatus.isSuccess || createStatus.isSuccess;
  const data = editStatus.data || createStatus.data;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitCourseHandler = () => {
    if (isEditMode) {
      const formData = new FormData();
      formData.append("courseTitle", input.title);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);
      formData.append("isPublished", input.isPublished);
      if (input.courseThumbnail) {
        formData.append("courseThumbnail", input.courseThumbnail);
      }
      editCourse({ courseId, formData });
    } else {
      createCourse({
        courseTitle: input.title,
        subTitle: input.subTitle,
        description: input.description,
        category: input.category,
        courseLevel: input.courseLevel,
        coursePrice: input.coursePrice,
        isPublished: input.isPublished,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course saved successfully");
      navigate("/admin/course");
    }
  }, [isSuccess]);

  if(courseByIdLoading) {
    return <div className="flex items-center justify-center h-screen"><h1>Loading..</h1></div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <CardTitle>Basic Course Info</CardTitle>
          <CardDescription>
            Make changes to your course information here. Click on the "Save"
            button to apply the changes.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button>{input.isPublished ? "Unpublish" : "Publish Course"}</Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label>Course Title</Label>
          <Input
            name="title"
            value={input.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Sub Title</Label>
          <Input
            name="subTitle"
            value={input.subTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Description</Label>
          <TiptapEditor input={input} setInput={setInput} />
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <Label>Category</Label>
            <Select onValueChange={selectCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="NodeJs">NodeJs</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Java">Java</SelectItem>
                  <SelectItem value="C++">C++</SelectItem>
                  <SelectItem value="Machine Learning">
                    Machine Learning
                  </SelectItem>
                  <SelectItem value="Data Structures">
                    Data Structures
                  </SelectItem>
                  <SelectItem value="Full Stack Development">
                    Full Stack Development
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Course Level</Label>
            <Select onValueChange={selectCourseLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={handleInputChange}
              className="w-[180px]"
            />
          </div>
        </div>
        <div>
          <Label>Thumbnail</Label>
          <Input type="file" onChange={selectThumbnail} />
          {previewThumbnail && (
            <img src={previewThumbnail} className="mt-2 w-64" />
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Cancel
          </Button>
          <Button onClick={submitCourseHandler} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : isEditMode ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
