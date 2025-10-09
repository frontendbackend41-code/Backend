import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  }
});

export async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"Adopciones 🐾" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log("📧 Correo enviado:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error al enviar correo:", err);
    throw err;
  }
}
