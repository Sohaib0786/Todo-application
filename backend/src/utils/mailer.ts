// Optional helper if you want to implement email later using nodemailer
import nodemailer from "nodemailer";



export async function sendResetEmail(to: string, resetLink: string) {
  // Use env SMTP_* for real emails
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || ""
    }
  });

  await transporter.sendMail({
    from: `"Todo App" <no-reply@todo.app>`,
    to,
    subject: "Password reset",
    text: `Reset link: ${resetLink}`,
    html: `<p>Reset link: <a href="${resetLink}">${resetLink}</a></p>`
  });
}
