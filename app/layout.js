import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Bookme - Explore your place to stay",
  description: "Hotel & Tourism Booking Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">
          <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}