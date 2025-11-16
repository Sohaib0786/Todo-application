import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { signToken } from "../utils/jwt";
import { sendResetEmail } from "../utils/mailer";

const SALT_ROUNDS = 10;
const RESET_EXPIRES_MIN = Number(process.env.RESET_TOKEN_EXPIRES_MINUTES || 60);

const AuthController = {
  async signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, password: hashed, name });
    const token = signToken({ id: user._id });

    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  },

  async login(req: Request, res: Response) {

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken({ id: user._id });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  },

  
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    // Always return success to avoid revealing whether email exists
    if (!user) {
      return res.json({ message: "If the email exists, a reset link will be sent" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + RESET_EXPIRES_MIN * 60 * 1000);
    await user.save();

    // Reset link (frontend will accept token)
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset/${token}`;

    // In production, send an email. For assignment/demo, we will return the token (so tester can use it).
    try {
      // await sendResetEmail(user.email, resetLink);
      // For demo convenience, return token in response
      res.json({
        message: "Password reset token generated (for demo returned in response). In production you would get this by email.",
        resetToken: token,
        resetLink
      });
    } catch (e) {
      // still respond success but log
      console.error("Failed to send reset email", e);
      res.json({
        message: "Password reset token generated. (failed to send email)",
        resetToken: token,
        resetLink
      });
    }
  },

  async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: "Token and newPassword required" });

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.resetToken = undefined as any;
    user.resetTokenExpiry = undefined as any;
    await user.save();

    res.json({ message: "Password reset successful" });
  }
};

export default AuthController;
