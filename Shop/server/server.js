const jsonServer = require("json-server");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const server = express();
const router = jsonServer.router(path.join(__dirname, "data", "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
  console.log("Created uploads directory:", uploadsPath);
}

const storage = multer.diskStorage({
  destination: uploadsPath,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

server.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File too large. Max size is 5MB." });
    }
  }
  res.status(400).json({ error: error.message });
});

server.use("/uploads", express.static(uploadsPath));
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
