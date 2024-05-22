import mongoose from "mongoose";

const { Schema } = mongoose;

export interface UserSchemaProps {
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  favoriteIds?: string[];
  accounts?: string[];
  listings?: string[];
  reservations?: string[];
}

export interface AccountSchemaProps {
  userId: mongoose.Schema.Types.ObjectId;
  type?: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
}

export interface ListingSchemaProps {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  price: number;
  locationValue: string;
  reservations: string[];
}

export interface ReservationSchemaProps {
  userId: mongoose.Schema.Types.ObjectId;
  listingId: mongoose.Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: Number;
}

const userSchema = new Schema<UserSchemaProps>(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    emailVerified: Date,
    image: String,
    password: String,
    favoriteIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Listing",
      },
    ],
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const accountSchema = new Schema<AccountSchemaProps>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: String,
  access_token: String,
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: String,
  session_state: String,
}, {
  timestamps: true
});

const listingSchema = new Schema<ListingSchemaProps>(
  {
    title: String,
    description: String,
    imageSrc: String,
    category: String,
    roomCount: Number,
    bathroomCount: Number,
    guestCount: Number,
    locationValue: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: Number,

    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const reservationSchema = new Schema<ReservationSchemaProps>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
  },
  {
    timestamps: true,
  }
);

accountSchema.index({ providerAccountId: 1, provider: 1 }, { unique: true });

userSchema.pre(/remove/, async function (next: any) {
  const user = this as any;
  try {
    // Delete related documents from other collections
    await mongoose.model("Account").deleteMany({ userId: user._id });
    await mongoose.model("Listing").deleteMany({ userId: user._id });
    await mongoose.model("Reservation").deleteMany({ userId: user._id });
    next();
  } catch (error) {
    next(error);
  }
});



const User = mongoose.models?.User || mongoose.model("User", userSchema);
const Account =
  mongoose.models?.Account || mongoose.model("Account", accountSchema);
const Listing =
  mongoose.models?.Listing || mongoose.model("Listing", listingSchema);
const Reservation =
  mongoose.models?.Reservation ||
  mongoose.model("Reservation", reservationSchema);

export { User, Account, Listing, Reservation };
