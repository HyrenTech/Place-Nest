import { useState } from "react";
import Layout from "@/components/layout";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

const CATEGORIES = [
  { label: "All", icon: "🏠" },
  { label: "Villas", icon: "🏰" },
  { label: "Lofts", icon: "🏢" },
  { label: "Cabins", icon: "🌲" },
  { label: "Beachfront", icon: "🏖️" },
  { label: "Design", icon: "🎨" },
  { label: "OMG!", icon: "🛸" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [, setLocation] = useLocation();

  const filteredListings = activeCategory === "All" 
    ? LISTINGS 
    : LISTINGS.filter(l => l.type.includes(activeCategory) || (activeCategory === "Beachfront" && l.title.includes("Beach")));

  return (
    <Layout>
      {/* Hero / Search Section for Mobile/Tablet prominent */}
      <section className="pt-8 pb-6 px-4 md:hidden">
        <div 
          className="bg-card rounded-full shadow-lg border p-2 flex items-center gap-4 cursor-pointer"
          onClick={() => setLocation("/search")}
        >
          <div className="bg-primary/10 p-2 rounded-full text-primary ml-1">
            <Search className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">Where to?</div>
            <div className="text-xs text-muted-foreground">Anywhere • Any week • Add guests</div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 py-4 mb-6">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 min-w-max pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex flex-col items-center gap-2 group cursor-pointer transition-all min-w-[64px] ${
                  activeCategory === cat.label 
                    ? "text-primary opacity-100" 
                    : "text-muted-foreground opacity-70 hover:opacity-100"
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                <span className={`text-xs font-medium pb-2 border-b-2 transition-colors ${
                  activeCategory === cat.label ? "border-primary" : "border-transparent group-hover:border-muted-foreground/30"
                }`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🏜️</div>
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">Try selecting a different category.</p>
            <Button variant="link" onClick={() => setActiveCategory("All")}>Clear filters</Button>
          </div>
        )}
      </section>
    </Layout>
  );
}
