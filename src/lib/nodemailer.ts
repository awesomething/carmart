
import { env } from "@/env";
import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: env.ETHEREAL_USER, // Your Ethereal email user
    pass: env.ETHEREAL_PASS, // Your Ethereal email password
  },
});
