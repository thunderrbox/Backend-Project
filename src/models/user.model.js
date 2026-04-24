import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//* JWT (JSON Web Token) is commonly used as a Bearer token for authentication.
//* Bearer token means: whoever "bears" (holds/sends) the token in the request is treated as the authenticated user.
//* It is usually sent in the HTTP header like: Authorization: Bearer <token>

// * --------------------------------------------------------------------*

// *generating the token for learning purpose by running this command on the terminal

//* For generating the secret key for JWT token we can use the crypto module of nodejs and run the below command on the terminal to generate the secret key for both access token and refresh token

// *node -e "const c = require('crypto'); console.log('ACCESS_TOKEN_SECRET=' + c.randomBytes(32).toString('hex')); console.log('REFRESH_TOKEN_SECRET=' + c.randomBytes(64).toString('hex'));"`

// * --------------------------------------------------------------------*

const userSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url similar to aws cloud storage
      required: true,
    },
    coverImage: {
      type: String,
      // required: true ,
    },
    password: {
      type: String, //* We used bcrypt (or bcrypt.js) package , this library is used to hash the password
      required: [true, "Password is required"],
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String, //*Jsonwebtoken library is used for generating the token and transferring the the data in encoded format . And this file include:
      // 1. header ---> [knowledge about algorithm used to encode & type of token]
      // 2. payload i.e. data ---> data like email and so on...
      // 3. verification signature ----> cryptography knowledge and a key(mostly public) is used named as secret for decoding the data which is being in encoded by the algo
    },
  },
  { timestamps: true }
);

//* type of middleware
//Encryption
userSchema.pre("save", async function (next) {
  //* We used function instead of normal callback function using (i.e. arrow function ----> (() => {}) because inside arrow function there is no knowledge of 'this.' keyword knowledge of above filled that's why we are using this function syntax for callback.
  // * And since there is algorithm used used which takes time so, we will add "async" before function
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

// Decryption
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

export const User = mongoose.model("User", userSchema);
