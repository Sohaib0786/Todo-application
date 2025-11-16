import dotenv from "dotenv";
dotenv.config();

import connectDB from "./configs/db";
import User from "./models/User";
import bcrypt from "bcryptjs";

async function seed() {
  await connectDB();
  const email = "demo@todo.app";
  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Demo user already exists:", email);
    process.exit(0);
  }
  const password = "password123";
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, name: "Demo User" });
  console.log("Created demo user:");
  console.log({ email, password, id: user._id });
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
