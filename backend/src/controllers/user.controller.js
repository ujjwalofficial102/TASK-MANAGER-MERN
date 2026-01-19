import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { z } from "zod";

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "profile fetched",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};

const updateProfileSchema = z.object({
  name: z.string().min(2, "name must be at least 2 characters").optional(),
  password: z
    .string()
    .min(6, "password must be at least 6 characters")
    .optional(),
});

export const updateMe = async (req, res) => {
  try {
    const parsed = updateProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const userId = req.user.id;
    const { name, password } = parsed.data;

    const updateData = {};

    if (name) updateData.name = name;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      message: "profile updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
  }
};
