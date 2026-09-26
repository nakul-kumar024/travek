import Hero from "@/component/Hero";
import HotelsSection from "@/component/HotelsSection";
import Features from "@/component/Features";
import Footer from "@/component/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <HotelsSection />
      <Features />
      <Footer />
    </main>
  );
}