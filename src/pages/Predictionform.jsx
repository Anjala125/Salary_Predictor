import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Predictionform() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const data = {
      experience: document.getElementById("experience").value,
      role: document.getElementById("role").value,
      education: document.getElementById("education").value,
      location: document.getElementById("location").value,
      skills: document.getElementById("skills").value,
    };

   if (
  !data.experience ||
  !data.role ||
  !data.education ||
  !data.location ||
  !data.skills
) {
  alert("Please fill all fields");
  return;
}


    try {
      const ai = new GoogleGenerativeAI(apiKey);
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a salary prediction system.

Based on the following inputs:
- Years of Experience: ${data.experience}
- Job Role / Field: ${data.role}
- Skills: ${data.skills}
- Education Level: ${data.education}
- Location: ${data.location}

Task:
1. Predict the estimated salary for the CURRENT year (2026).
2. Predict the estimated salary for the SAME profile for the past three years (2025, 2024, 2023).

Rules:
- Use realistic industry standards for the given location and role.
- Salaries must be in INR.
- Return ONLY numbers.
- Do NOT include any explanation, text, symbols, or currency words.
- Output must be in this exact order and format:

CurrentYearSalary,2025Salary,2024Salary,2023Salary
`;
      const response = await model.generateContent(prompt);
      const result = response.response.text();
      
      console.log(result);

     
      const salaries = result.trim().split(',').map(s => s.trim());
      const salary2026 = salaries[0] ;
      const salary2025 = salaries[1] ;
      const salary2024 = salaries[2] ;
      const salary2023 = salaries[3] ;

      console.log("2026 Salary:", salary2026);
      console.log("2025 Salary:", salary2025);
      console.log("2024 Salary:", salary2024);
      console.log("2023 Salary:", salary2023);

      const predictionData = {
        experience: data.experience,
        role: data.role,
        education: data.education,
        location: data.location,
        skills: data.skills,
        salary2026: salary2026,
        salary2025: salary2025,
        salary2024: salary2024,
        salary2023: salary2023,
      
      };
      
      localStorage.setItem('latest_prediction', JSON.stringify(predictionData));
      
      navigate("/dashboard", { state: { predictionData } });

    } catch (err) {
      console.error("Prediction error:", err);
      alert("Prediction failed: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f2f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#111636] p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-center">
          Salary Prediction
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            <label className="text-sm text-gray-400">
              Experience (Years)
            </label>
            <input id="experience" type="number" min="0" max="50" className="w-full mt-1 px-4 py-3 rounded-lg bg-[#1a1f4a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"placeholder="e.g., 5"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Job Role</label>
            <input
              id="role"
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-[#1a1f4a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Software Engineer"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Education</label>
            <select
              id="education"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-[#1a1f4a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Education</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Location</label>
            <input
              id="location"
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-[#1a1f4a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Skills</label>
            <input
              id="skills"
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-[#1a1f4a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., React, Node.js, Python"
            />
          </div>

          <div className="md:col-span-2 mt-6">
            <button
              onClick={handlePredict}
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Predicting..." : "Predict Salary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predictionform;