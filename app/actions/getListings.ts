import connectDB from "../libs/connectDB";
import { Listing } from "../libs/models";

export default async function getListings() {
  try {
    await connectDB();
    const listings: typeof Listing.prototype = await Listing.find({}).sort({
      createdAt: -1,
    }).lean();
    
    const safeListings = listings.map((listing: typeof Listing.prototype) => ({
      ...listing,
      createdAt: listing.createdAt.toString(),
      _id: listing._id.toString(),
      updatedAt: listing.updatedAt.toString(),
      userId: listing.userId.toString(),
    }));

    return safeListings;

  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
