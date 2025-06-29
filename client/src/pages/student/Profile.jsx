import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { useLoadUserQuery,useUpdateUserMutation } from "@/features/api/authApi";
// import { toast } from "sonner";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading ,refetch} = useLoadUserQuery();
  const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, error,isSuccess,isError }] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

useEffect(() => {
refetch();
},[])

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile updated successfully");
    }
    if (isError) {
      toast.error(error.message || "Something went wrong");
    }
  }, [isSuccess, isError, updateUserData, error]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const  user  = data && data.user;
  
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col items-center md:items-start md:flex-row gap-4 my-5">
        <div className="flex flex-col items-center gap-2">
          <Avatar className={"h-24 w-24 md:h-32 md:w-32 mb-4"}>
            <AvatarImage
              src={user?.photoURL || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-4">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray- ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray- ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div className="mb-4">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray- ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                size="sm"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Edit your profile information and save when you are done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className={"cols-span-3"}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className={"cols-span-3"}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={updateUserHandler}
                  disabled={updateUserIsLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you are enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {user.enrolledCourses.length === 0 ? (
            <h1>No courses enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
