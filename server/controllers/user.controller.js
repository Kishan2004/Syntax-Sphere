import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMedia, uploadMedia } from "../utils/Cloudinary.js"; // Ensure these are defined and imported

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "This email already exists." });
    const hashedpswd = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashedpswd,
    });
    res.status(201).json({ msg: "User registered successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill in all fields." });
    }
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ msg: "Incorrect email or pasword" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect email or password" });

    generateToken(user, res, `Welcome back ${user.name}!`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      msg: "logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed To Logout" });
  }
};

export const getUserProfile = async(req, res) => {
      try{
        const userId=req.id;
        const user = await User.findById(userId).select("-password")
        if(!user){
          return res.status(404).json({ msg: "User not found", 

            
            success:false
            
          });
        }
        return res.status(200).json({
          success:true,
          user
        })
      }catch(error){
        console.log(error)
        return res.status(500).json({ msg: "Failed to get user profile" });
      }
};


export const updateProfile = async (req,res) => {
  try {
      const userId = req.id;
      const {name} = req.body;
      const profilePhoto = req.file;

      const user = await User.findById(userId);
      if(!user){
          return res.status(404).json({
              message:"User not found",
              success:false
          }) 
      }
      // extract public id of the old image from the url is it exists;
      if(user.photoURL){
          const publicId = user.photoURL.split("/").pop().split(".")[0]; // extract public id
          deleteMedia(publicId);
      }

      // upload new photo
      const cloudResponse = await uploadMedia(profilePhoto.path);
      const photoURL = cloudResponse.secure_url;

      const updatedData = {name, photoURL};
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

      return res.status(200).json({
          success:true,
          user:updatedUser,
          message:"Profile updated successfully."
      })

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"Failed to update profile"
      })
  }
}