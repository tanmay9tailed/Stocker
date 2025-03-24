import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Theme from "@/components/theme-changer";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Validate password with multiple error conditions
  const validatePassword = (password) => {
    const errors = [];
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!upperCase.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!lowerCase.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!number.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!specialChar.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    if (errors.length === 0) {
      setPasswordError([]);
      setPasswordValid(true);
      return true;
    }

    setPasswordError(errors);
    setPasswordValid(false);
    return false;
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for password
    if (name === "password") {
      validatePassword(value);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      setErrorMsg("Please enter a valid password.");
      return;
    }

    try {
      const res = await axios.post("/api/register", formData);
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col lg:flex-row overflow-hidden items-center justify-center bg-gradient-to-r from-black via-zinc-900 to-black w-full gap-4 mx-auto px-8 relative">
      <div
        onMouseEnter={() => setHovered(false)}
        onMouseLeave={() => setHovered(true)}
        className="z-20 flex items-center justify-center bg-black dark:bg-zinc-900 rounded-2xl shadow-2xl"
      >
        <div className="max-w-lg w-full bg-zinc-800 p-10 rounded-2xl shadow-lg border border-zinc-700">
          <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
            Register
          </h1>
          {errorMsg && (
            <div className="text-red-500 text-sm mb-4 text-center">
              {errorMsg}
            </div>
          )}
          <form className="space-y-6 z-50" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-1 block w-full px-4 py-2 bg-zinc-700 text-white border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 bg-zinc-700 text-white border border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {/* Show all errors as bullet points */}
              {passwordError.length > 0 && (
                <ul className="text-red-500 text-xs mt-2 list-disc list-inside">
                  {passwordError.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 ${
                passwordValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-zinc-600 cursor-not-allowed"
              } text-white font-medium rounded-lg transition-all duration-300 focus:outline-none`}
              disabled={!passwordValid}
            >
              Sign Up
            </button>
            {/* Redirect to Login */}
            <Link
              href="/login"
              className="flex justify-center text-sm text-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Already have an account? Log In
            </Link>
          </form>
        </div>
      </div>

      <Theme />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={2}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
    </div>
  );
};

export default Register;
