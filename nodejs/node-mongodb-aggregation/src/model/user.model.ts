import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  index: number;
  name: string;
  isActive: boolean;
  registered: Date;
  age: number;
  gender: "male" | "female" | "other";
  eyeColor: string;
  favoriteFruit: string;
  company: {
    title: string;
    email: string;
    phone: string;
    location: {
      country: string;
      address: string;
    };
  };
  tags: string[];
}

const UserSchema = new Schema<IUser>({
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  registered: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  favoriteFruit: {
    type: String,
    required: true,
  },
  company: {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  },
  tags: {
    type: [String],
    default: [],
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
export type { IUser };
