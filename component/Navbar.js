"use client";

import { useState } from "react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-30 w-full px-6 pt-0 lg:px-12">
      <div className="flex items-center justify-between max-w-7xl mx-auto pt-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 animate-fade-in-down" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={220}
            height={60}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Reverse Trapezoid Nav */}
        <div className="hidden md:flex absolute left-1/2 translate-x-[-18%] top-0 animate-fade-in-down" style={{ animationDelay: "0.25s", opacity: 0 }}>
          <div
            className="px-12 py-4 flex items-center gap-8 text-sm font-medium text-white shadow-xl backdrop-blur-md"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <Link href="/list-property" className="hover:text-white/90 transition">
              List as property
            </Link>
            <Link href="/support" className="hover:text-white/90 transition">
              Support
            </Link>
            <Link href="/trips" className="hover:text-white/90 transition">
              Trips
            </Link>

            {/* Auth */}
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="hover:text-white/90 transition">
                  Sign in
                </button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <UserButton afterSignOutUrl="/" />
            </Show>


          </div>
        </div>

        {/* Instagram Button */}
        <div className="hidden md:flex animate-slide-in-right" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 opacity-90 group-hover:opacity-100 transition" />
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="relative z-10">Instagram</span>
          </a>
        </div>

        {/* Mobile button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-4 right-4 z-40 bg-white rounded-2xl shadow-xl px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link href="/list-property" onClick={() => setOpen(false)}>
              List as property
            </Link>
            <Link href="/support" onClick={() => setOpen(false)}>
              Support
            </Link>
            <Link href="/trips" onClick={() => setOpen(false)}>
              Trips
            </Link>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-left" onClick={() => setOpen(false)}>
                  Sign in
                </button>
              </SignInButton>
            </Show>

            <Show when="signed-in">
              <div className="pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </Show>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 text-white py-2.5 rounded-full font-medium"
              onClick={() => setOpen(false)}
            >
              Instagram
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}