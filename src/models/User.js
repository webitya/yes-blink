import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user",
  },
  googleId: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  phone: {
    type: String,
  },
  addresses: [
    {
      type: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
      },
      address: String,
    },
  ],
})

const User = mongoose.model("User", UserSchema)
export default User
