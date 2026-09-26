import { Search, Star, Users } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-gray-900 text-white py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Feature 1 */}
        <div className="space-y-3">
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto md:mx-0">
            <Search className="text-amber-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold">See it all</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            From budget stays to luxury resorts — explore thousands of options in one place.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="space-y-3">
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto md:mx-0">
            <Star className="text-amber-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Compare right here</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Easily compare prices, ratings, and amenities so you always get the best deal.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="space-y-3">
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto md:mx-0">
            <Users className="text-amber-400" size={24} />
          </div>
          <h3 className="text-xl font-semibold">Get exclusive rates</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Unlock member-only discounts and special offers when you book directly with us.
          </p>
        </div>

      </div>
    </section>
  );
}