const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs/promises");
// const crypto = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

// const tempDir = path.join(__dirname, "temp");

// const multerConfig = multer.diskStorage({
//   destination: tempDir,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

// const contacts = [];

// const avatarDir = path.join(__dirname, "public", "avatars");

// app.post(
//   "/api/avatar",
//   upload.single("Stay_with_Ukraine"),
//   async (req, res) => {
//     try {
//       const { path: tempDir, filename } = req.file;
//       const resultUpload = path.join(avatarDir, filename);
//       await fs.rename(tempDir, resultUpload);
//       const { name, email, phone } = req.body;
//       const picture = path.join("avatars", filename);
//       const newContact = {
//         id: crypto.randomUUID(),
//         name,
//         email,
//         phone,
//         picture,
//       };
//       contacts.push(newContact);
//       res.status(201).json(newContact);
//     } catch (error) {
//       await fs.unlink(req.file.path);
//     }
//   },
// );

// app.get("/api/avatar", async (req, res) => {
//   res.json(contacts);
// });

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
