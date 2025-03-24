"use client";
import React from "react";
import { BackgroundBeams } from "../components/ui/background-beams";
import { FloatingDock } from "../components/ui/floating-doc";
import Theme from "@/components/theme-changer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import navLinks from "@/utils/navLinks";
import Logo from "@/components/logo";
import Link from "next/link";
import Notifications from "@/components/Notifications";

export default function BackgroundBeamsDemo() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (session && session.user && !id) {
      setId(session.user._id || session.user.id);
    }
  }, [session, id]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && (!session || !session.user)) {
      router.push("/login");
    }
  }, [loading, session, router]); // Dependencies to ensure it only runs when loading or session changes

  if (!mounted || loading) {
    return <div>Loading...</div>;
  }
  const links = navLinks;

  return (
    <>
      {" "}
      {id!=null &&<Notifications userId={id} />}
      <div className="h-[100vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <Logo />
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Track your Stocks
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Keep track of your stocks and investments with Strocker.
          </p>

          <div className="flex justify-center mt-5">
            <Link
              href={"/portfolio"}
              className=" bg-slate-800  no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative text-base flex space-x-2 items-center z-10 rounded-full bg-zinc-950 p-3 px-6 ring-1 ring-white/10 ">
                <span>Check Portfolio</span>
                <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </Link>
          </div>
        </div>
        <BackgroundBeams />
        <div className="flex fixed bottom-10  items-center justify-center h-[3rem] w-full">
          <FloatingDock items={links} />
        </div>
        <Theme />
      </div>
    </>
  );
}
