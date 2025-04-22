import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth.js";
import roomRoutes from "./src/routes/room.js";
import questionRoutes from "./src/routes/question.js";

const app = express();
const port = 1234;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(cookieParser());

// Routes
app.use(authRoutes);
app.use(roomRoutes);
app.use(questionRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
