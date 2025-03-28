"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Theme from "@/components/theme-changer";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);

    // If session is present, redirect to homepage
    if (session) {
      router.push("/");
    }
  }, [session]);

  if (!mounted) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission with next-auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const res = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setErrorMsg("Invalid email or password.");
    } else {
      router.push("/");
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
            Log In
          </h1>
          {errorMsg && (
            <div className="text-red-500 text-sm mb-4 text-center">{errorMsg}</div>
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
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none"
            >
              Log In
            </button>
            {/* Redirect to Register */}
            <Link
              href="/register"
              className="flex justify-center text-sm text-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Don&apos;t have an account? Sign Up
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

export default Login;
