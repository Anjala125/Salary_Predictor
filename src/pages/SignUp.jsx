import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const user = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(user));
    navigate("/signin");
  };

  return (
    <div className="w-screen h-screen flex bg-[#0b0f2f] text-white">
      {/* LEFT SIDE*/}
      <div
        className="hidden lg:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/download.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/40"></div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <p className="uppercase tracking-[0.3em] text-gray-300 text-sm">
            Inspired by the future
          </p>

          <h1 className="text-5xl font-extrabold mt-6 leading-tight">
            Employee <br />
            Salary <span className="text-blue-400">Predictor</span>
          </h1>

          <p className="mt-6 text-gray-300 max-w-md leading-relaxed">
            Predict employee salaries using modern data-driven
            intelligence. Simple, fast, and built for the future.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (UNCHANGED) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#111636] p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-center">Welcome!</h2>
          <p className="text-center text-gray-400 text-sm mt-2">
            Create your account to predict your salary
          </p>

          {error && (
            <p className="text-red-400 text-sm text-center mt-4">
              {error}
            </p>
          )}

          <form onSubmit={validate} className="space-y-4 mt-6">
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1f4a]"
            />

            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1f4a]"
            />

            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1f4a]"
            />

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1f4a]"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              SIGN UP
            </button>
          </form>

          <div className="flex justify-center items-center gap-1 mt-4">
            <p className="text-gray-400 text-sm">
              Already have an account?
            </p>
            <p
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
