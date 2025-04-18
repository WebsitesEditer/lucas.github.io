//서버시작 할때: npm start
//서버링크: http://localhost:3000/
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const port = 3000;

console.log("✅ Loaded API Key:", process.env.GEMINI_API_KEY);

app.use(express.static("public"));
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-latest" });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log("📩 Prompt received:", prompt);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ result: text });
  } catch (error) {
    console.error("❌ Error in /generate:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./public" });
});

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
