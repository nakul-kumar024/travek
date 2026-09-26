"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, MapPin, DollarSign, Upload, Check } from "lucide-react";

export default function ListPropertyPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50/30 to-orange-50/20">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
          <div className="text-lg font-bold text-gray-900">
            Bookme<span className="text-amber-500">.com</span>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                  step >= s
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 rounded-full ${
                    step > s ? "bg-amber-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl border border-white/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Home size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Property Details</h1>
                <p className="text-gray-500 text-sm">Tell us about your place</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oceanview Villa"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Property Type
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition bg-white">
                  <option>Hotel</option>
                  <option>Villa</option>
                  <option>Resort</option>
                  <option>Apartment</option>
                  <option>Guest House</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your property, amenities, and what makes it special..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/25"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Location & Pricing */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl border border-white/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <MapPin size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Location & Pricing</h1>
                <p className="text-gray-500 text-sm">Where is it and how much?</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Address
                </label>
                <input
                  type="text"
                  placeholder="Street, City, Country"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Bali"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    placeholder="Indonesia"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price per night (USD)
                </label>
                <div className="relative">
                  <DollarSign
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    placeholder="150"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3.5 rounded-xl transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/25"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl border border-white/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Upload size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Photos</h1>
                <p className="text-gray-500 text-sm">Show off your property</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-amber-400 transition cursor-pointer">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Upload size={24} />
              </div>
              <p className="font-medium text-gray-900">Click to upload photos</p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG up to 10MB each (minimum 5 photos recommended)
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3.5 rounded-xl transition"
              >
                Back
              </button>
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-amber-500/25">
                Submit Property
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}