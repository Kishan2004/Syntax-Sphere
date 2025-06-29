import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Badge } from "@/components/ui/badge";

// const img="./nextjs_img.jpg"
const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyDSr-RyEy9VvPSsV-qIqOLmEhvZQj4xOtg&s"
          className="w-full h-36 object-cover rounded-t"
          alt="Course"
        />
      </div>
      <CardContent className={"px-5 py-4  space-y-3"}>
        <h1 className="hover:underline font-bold text-lg truncate">
          Next js complete couse in hindi 2025
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={"h-6 w-6"}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Suman Sau</h1>
          </div>
          <Badge className="bg-blue-500 text-white rounded-md px-2 py-1 rounded-full text-xs font-semibold">
            Advanced
          </Badge>
        </div>
          <div className="text-lg font-bold">
            <span>₹499</span>
          </div>
      </CardContent>
    </Card>
  );
};

export default Course;
