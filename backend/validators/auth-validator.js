const {z} = require('zod');

// Create an object Schema

// Create a Login Schema
const loginSchema = z.object(
    {
        email: z
        .string({ required_error: "Email is Required"})
        .trim()
        .email({message: "Invalid Email Address"})
        .min(3, { message: "Email must be at least of 03 Characters. "})
        .max(255, { message: "Email must not be more than 255 characters"}),
        password: z
        .string({ required_error: "Password is Required"})
        .trim()
        .min(7, { message: "Password must be at least of 07 Characters. "})
        .max(1024, { message: "Password must not be more than 1024 characters"}),
      }
  );

// Create a Signup Schema

const signupSchema = loginSchema.extend({
 username: z
 .string({ reqired_error: "Name is required" })
 .trim()
 .min(3, { message: "Name must be atleast 3 characters"})
 .max(255, {message: "Name must not be more then 255 characters"}),

email: z
 .string({ reqired_error: "Email is required" })
 .trim()
 .email({ message:"Invalid email address "})
 .min(3, { message: "email must be atleast 3 characters"})
 .max(255, {message: "email must not be more then 255 characters"}),

phone: z
 .string({ reqired_error: "phone is required" })
 .trim()
 .min(10, { message: "phone must be atleast 11 characters"})
 .max(20, {message: "phone must be more atleast 20 characters"}),

password: z
 .string({ reqired_error: "password is required" })
 .trim()
 .min(6, { message: "password must be atleast 6 characters"})
 .max(1024, {message: "password can't be greater then 1024 characters"}),

});

  module.exports = {loginSchema, signupSchema,};