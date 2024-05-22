import connectDB from "@/app/libs/connectDB";
import { User } from "@/app/libs/models";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const { email, password, name } = body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // check if email already exist
  if (await User.findOne({ email })) {
    throw new Error("Email already exist");
  }

  let user;
  try {
    user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong!!! Can't create user.");
  }

  return NextResponse.json(user);
}
