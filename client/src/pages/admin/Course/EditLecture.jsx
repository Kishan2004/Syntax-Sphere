import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const EditLecture = () => {
  return (
    <div className="flex item-center justify-center h-screen">
      <div className="flex item-center gap-2">
        <Link>
          <Button size="icon" variant="outline "className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EditLecture;
