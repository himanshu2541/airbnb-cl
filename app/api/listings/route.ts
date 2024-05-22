import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import connectDB from "@/app/libs/connectDB";
import { Listing, User, UserSchemaProps } from "@/app/libs/models";

export async function POST(request: Request) {
  const currentUser: typeof User.prototype = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  if (
    !title ||
    !description ||
    !imageSrc ||
    !category ||
    !roomCount ||
    !bathroomCount ||
    !guestCount ||
    !location ||
    !price
  ) {
    return NextResponse.error();
  }

  let listing;
  try {
    await connectDB();
    listing = await Listing.create({
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser._id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }

  return NextResponse.json(listing);
}
