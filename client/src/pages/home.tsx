import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Map } from "lucide-react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Tudo", icon: "🏠" },
  { label: "Vilas", icon: "🏰" },
  { label: "Apartamento", icon: "🏢" },
  { label: "Cabana", icon: "🌲" },
  { label: "Frente ao Mar", icon: "🏖️" },
  { label: "Design", icon: "🎨" },
  { label: "UAU!", icon: "🛸" },
  { label: "Piscinas", icon: "🏊" },
  { label: "Fazendas", icon: "🚜" },
  { label: "No campo", icon: "🐑" },
  { label: "Tropical", icon: "🌴" },
  { label: "Cidades", icon: "🏙️" },
  { label: "Ártico", icon: "❄️" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const [, setLocation] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const filteredListings = activeCategory === "Tudo" 
    ? LISTINGS 
    : LISTINGS.filter(l => l.type === activeCategory || (activeCategory === "Frente ao Mar" && l.type === "Frente ao Mar"));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      {/* Categories Bar - Floating Apple Design */}
      <section className="sticky top-14 md:top-16 z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.03] h-14 md:h-20 flex items-center transition-all duration-300">
        <div className="container mx-auto px-6 sm:px-12 relative flex items-center gap-6 h-full">
          <div className="relative flex-1 flex items-center overflow-hidden h-full">
            {showLeftArrow && (
              <div className="absolute left-0 z-10 h-full flex items-center bg-gradient-to-r from-white via-white/80 to-transparent pr-12">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full size-9 shadow-lg border-black/[0.05] hover:scale-110 active:scale-95 transition-all bg-white"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>
            )}
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-10 overflow-x-auto no-scrollbar scroll-smooth h-full items-center px-4"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex flex-col items-center gap-2.5 group cursor-pointer transition-all min-w-[64px] h-full justify-center relative ${
                    activeCategory === cat.label 
                      ? "text-primary opacity-100" 
                      : "text-muted-foreground/60 opacity-100 hover:text-foreground hover:scale-105"
                  }`}
                >
                  <span className="text-[26px] transition-transform duration-300 group-active:scale-90">{cat.icon}</span>
                  <span className="text-[13px] font-bold whitespace-nowrap tracking-tight">
                    {cat.label}
                  </span>
                  {activeCategory === cat.label && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full shadow-[0_-4px_12px_rgba(255,56,92,0.3)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {showRightArrow && (
              <div className="absolute right-0 z-10 h-full flex items-center bg-gradient-to-l from-white via-white/80 to-transparent pl-12">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full size-9 shadow-lg border-black/[0.05] hover:scale-110 active:scale-95 transition-all bg-white"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
          
          <Button variant="outline" className="hidden md:flex gap-3 rounded-2xl h-12 px-6 border-black/[0.08] font-bold hover:bg-black/5 transition-all shadow-sm active:scale-95">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-[13px] font-bold">Filtros</span>
          </Button>
        </div>
      </section>

      {/* Listings Grid - Optimized for readability */}
      <section className="container mx-auto px-4 sm:px-12 pt-10 pb-24">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12"
          >
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-40 bg-muted/5 rounded-3xl border-2 border-dashed border-border/20 mt-4">
            <div className="text-6xl mb-8 animate-bounce">🏝️</div>
            <h3 className="text-2xl font-black mb-4">Infelizmente nada por aqui...</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 font-medium">Tente explorar outras categorias ou remova os filtros para encontrar o lugar perfeito.</p>
            <Button 
              variant="default" 
              className="rounded-xl px-10 h-14 font-black text-lg shadow-xl hover:scale-105 transition-transform" 
              onClick={() => setActiveCategory("Tudo")}
            >
              Ver todos os anúncios
            </Button>
          </div>
        )}
      </section>

      {/* Floating Map Button - Enhanced Design */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 md:bottom-12"
      >
        <Button className="rounded-full h-14 px-8 bg-foreground text-background hover:scale-105 active:scale-95 transition-all shadow-2xl font-black gap-3 group">
          <span>Mostrar mapa</span>
          <Map className="h-5 w-5 group-hover:rotate-12 transition-transform" />
        </Button>
      </motion.div>
    </Layout>
  );
}
