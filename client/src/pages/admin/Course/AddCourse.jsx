import { Label } from "@/components/ui/label";
import React,{useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateCourseMutation } from "@/features/api/courseApi";
 

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

 const [createCourse,{data,error,isLoading,isSuccess}]=useCreateCourseMutation();
  const navigate=useNavigate()
  

  const getSelectedCategory=(value)=>{
    setCategory(value);
  }

  const createCourseHandler=async()=>{
    await createCourse({courseTitle,category});
    console.log(courseTitle,category);
  }

  //for displaing toast message
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course Created Successfully");
      navigate("/admin/course");
    }
    
  },[isSuccess,error]);
 
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Add Course For Basic Course Details
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          voluptatem?
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="NextJS">NextJS</SelectItem>
          <SelectItem value="JS">JS</SelectItem>
          <SelectItem value="React">React</SelectItem>
          <SelectItem value="NodeJs">NodeJs</SelectItem>
          <SelectItem value="MONGODB">MONGODB</SelectItem>
          <SelectItem value="PHP">PHP</SelectItem>
          <SelectItem value="MYSql">MYSql</SelectItem>
          <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Python">Python</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
        <div className="space-y-2">
          <Button variant={"outline"} onClick={()=>navigate("/admin/course")}>Back</Button>
          <Button disabled={isLoading} onClick={createCourseHandler} >
            {
              isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin">Please wait...</Loader2>
                </>
              ):"Create"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
