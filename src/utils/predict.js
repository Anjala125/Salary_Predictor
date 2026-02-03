// src/utils/predict.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
   dangerouslyAllowBrowser: true,  // browser-restricted key
});


export default async function predictSalary(data) {
  const prompt = `
Predict the annual salary in INR.

Experience: ${data.experience} years
Role: ${data.role}
Education: ${data.education}
Location: ${data.location}
Skills: ${data.skills}

Respond with numbers only.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful salary prediction assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      max_tokens: 100,
    });

    // The predicted salary text
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI error:", err);
    throw new Error("Prediction failed");
  }
}
