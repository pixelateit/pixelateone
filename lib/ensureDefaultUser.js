// lib/ensureDefaultUser.js
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function ensureDefaultUser() {
  const adminEmail = "PrakharS@protonmail.com"; // your default
  const existing = await User.findOne({ email: adminEmail });

  if (!existing) {
    const hashedPassword = await bcrypt.hash("Londonprakhar@1", 10);

    await User.create({
      name: "Prakhar Admin",
      email: adminEmail,
      password: hashedPassword,
      profilePicture: "https://placehold.co/400/png", // default avatar
      isGoogleAccount: false,
    });

    console.log("✅ Default admin user created");
  }
}
