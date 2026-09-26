import Navbar from "@/component/Navbar";
import SearchBar from "@/component/SearchBar";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-175 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-80px)] px-4 text-center">
        
        {/* Title */}
        <h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-3xl leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          Explore your place <span className="text-amber-400">to stay</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="mt-5 text-white/80 text-lg max-w-xl animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          We provide a variety of the best lodging recommendations for those of you who need it
        </p>

        {/* Search Bar */}
        <div 
          className="mt-10 animate-scale-in"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  );
}