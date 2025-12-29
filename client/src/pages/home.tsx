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
      {/* Categories Bar - Refined with Arrows and Shadow */}
      <section className="sticky top-16 md:top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/40 py-2 sm:py-0 h-16 flex items-center shadow-sm">
        <div className="container mx-auto px-4 sm:px-12 relative flex items-center gap-4 h-full">
          <div className="relative flex-1 flex items-center overflow-hidden h-full">
            {showLeftArrow && (
              <div className="absolute left-0 z-10 h-full flex items-center bg-gradient-to-r from-background via-background to-transparent pr-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full size-8 shadow-md border-border/60 hover:scale-110 transition-transform bg-background"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth h-full items-center px-2"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex flex-col items-center gap-2 group cursor-pointer transition-all min-w-[56px] h-full justify-center relative ${
                    activeCategory === cat.label 
                      ? "text-foreground opacity-100" 
                      : "text-muted-foreground opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300 group-active:scale-95">{cat.icon}</span>
                  <span className="text-xs font-bold whitespace-nowrap tracking-tight">
                    {cat.label}
                  </span>
                  {activeCategory === cat.label && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {showRightArrow && (
              <div className="absolute right-0 z-10 h-full flex items-center bg-gradient-to-l from-background via-background to-transparent pl-8">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full size-8 shadow-md border-border/60 hover:scale-110 transition-transform bg-background"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <Button variant="outline" className="hidden md:flex gap-3 rounded-xl h-12 px-5 border-border/60 font-bold hover:bg-muted/30 transition-colors shadow-sm active:scale-95">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-xs uppercase tracking-wider">Filtros</span>
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
