import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { User } from "@/app/libs/models";
import connectDB from "../libs/connectDB";

export async function getSession() {
  await connectDB();
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser: typeof User.prototype = await User.findOne({
      email: session.user.email as string,
    })
      .select("-password")
      .lean();
    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      _id: currentUser?._id?.toString(),
      createdAt: currentUser?.createdAt?.toString() || null,
      updatedAt: currentUser?.updatedAt?.toString() || null,
      emailVerified: currentUser?.emailVerified?.toString() || null,
    };

  } catch (error: any) {
    console.log(error);
    return null;
  }
}
