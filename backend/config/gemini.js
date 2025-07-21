// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();
// const apiKey = `${
//   process.env.GEMINI_API_KEY || "AIzaSyBNMAvhm3zqrrFrTfg2EAZ3FkT3WUUCzj0"
// }`;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
//   generationConfig: {
//     maxOutputTokens: 8192,
//   },
//   tools: [{ googleSearch: {} }],
// });

// export const makeContent = async (prompt) => {
//   const result = await model.generateContent(prompt);
//   return result.response.text();
// };


const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBNMAvhm3zqrrFrTfg2EAZ3FkT3WUUCzj0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 8192,
  },
  tools: [{ googleSearch: {} }],
});

const makeContent = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = { makeContent };
