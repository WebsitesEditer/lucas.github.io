import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  const allModels = await genAI.getModels();
  allModels.models.forEach((model) => {
    console.log(`🧠 Model ID: ${model.name}`);
  });
}

listModels();
