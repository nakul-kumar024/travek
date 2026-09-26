"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How do I cancel or modify a booking?",
    answer:
      "You can cancel or modify your booking from the Trips section in your account. Cancellation policies vary by property, so please check the specific terms before confirming.",
  },
  {
    question: "When will I be charged for my reservation?",
    answer:
      "Most properties charge at the time of booking. Some allow payment at the property. The payment details are clearly shown before you confirm your reservation.",
  },
  {
    question: "How do I contact the property directly?",
    answer:
      "Once your booking is confirmed, you’ll find the property’s contact details in your booking confirmation email and in the Trips section of your account.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "Yes. We use industry-standard encryption and secure payment partners to protect your personal and payment information.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refund eligibility depends on the property’s cancellation policy. Free cancellation options are clearly marked during the booking process.",
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState(null);

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

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5 text-amber-600">
            <HelpCircle size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">How can we help?</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Find answers to common questions or get in touch with our support team.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition shadow-sm"
          />
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600">
              <MessageCircle size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Chat with our team in real-time</p>
            <button className="text-sm font-medium text-amber-600 hover:underline">
              Start chat
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-4 text-green-600">
              <Mail size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
            <p className="text-sm text-gray-500 mb-4">We usually reply within 24 hours</p>
            <button className="text-sm font-medium text-amber-600 hover:underline">
              Send email
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-4 text-purple-600">
              <Phone size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
            <p className="text-sm text-gray-500 mb-4">Available 9 AM – 9 PM daily</p>
            <button className="text-sm font-medium text-amber-600 hover:underline">
              +1 (555) 123-4567
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}