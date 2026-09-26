import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              Bookme<span className="text-amber-400">.com</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Discover and book the best stays around the world. From luxury resorts to cozy villas.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">About us</Link>
              </li>
              <li>
                <Link href="/list-property" className="hover:text-white transition">List your property</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Careers</Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition">Support</Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/search" className="hover:text-white transition">Hotels</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Villas</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Resorts</Link>
              </li>
              <li>
                <Link href="/trips" className="hover:text-white transition">Your trips</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Bookme.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}