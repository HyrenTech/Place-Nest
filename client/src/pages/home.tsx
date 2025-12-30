import { useState, useRef, useEffect } from "react";
import Layout from "@/components/layout";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { label: "Tudo", value: "Tudo" },
  { label: "Vilas", value: "Vila" },
  { label: "Apartamentos", value: "Apartamento" },
  { label: "Lofts", value: "Loft" },
  { label: "Cabanas", value: "Cabana" },
  { label: "Frente ao Mar", value: "Frente ao Mar" },
  { label: "Design", value: "Design" },
  { label: "UAU!", value: "UAU!" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const heroListing = LISTINGS[0];

  const filteredListings =
    activeCategory === "Tudo"
      ? LISTINGS
      : LISTINGS.filter((listing) => listing.type === activeCategory);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto grid items-center gap-10 px-4 pb-12 pt-10 sm:px-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.4rem]">
                Estadias que parecem feitas sob medida para a sua próxima fuga.
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Descubra vilas, lofts e cabanas com design impecável, serviço impecável e
                atmosfera digna de editorial.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button className="h-12 rounded-full px-6 text-sm font-semibold">
                Explorar destinos
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 shadow-[var(--shadow-md)]">
              <img
                src={heroListing.images[0]}
                alt={heroListing.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="sticky top-14 z-40 border-y border-black/[0.04] bg-white/70 backdrop-blur-xl md:top-16">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-12">
          <div className="relative flex-1 overflow-hidden">
            {showLeftArrow && (
              <div className="absolute left-0 z-10 h-full w-14 bg-gradient-to-r from-white via-white/90 to-transparent">
                <div className="flex h-full items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-1 h-9 w-9 rounded-full border border-border/70 bg-white/80 shadow-sm"
                    onClick={() => scroll("left")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex items-center gap-8 overflow-x-auto px-1 py-2 no-scrollbar"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`group relative flex min-w-[72px] flex-col items-center gap-1 px-2 py-2 text-xs font-semibold transition-all ${
                    activeCategory === cat.value
                      ? "text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground"
                  }`}
                >
                  <span className="whitespace-nowrap tracking-tight">
                    {cat.label}
                  </span>
                  {activeCategory === cat.value && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute -bottom-2 left-3 right-3 h-[3px] rounded-full bg-foreground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {showRightArrow && (
              <div className="absolute right-0 top-0 z-10 h-full w-14 bg-gradient-to-l from-white via-white/90 to-transparent">
                <div className="flex h-full items-center justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="mr-1 h-9 w-9 rounded-full border border-border/70 bg-white/80 shadow-sm"
                    onClick={() => scroll("right")}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="hidden h-10 w-10 rounded-full border border-border/70 bg-white/70 shadow-sm md:flex"
            aria-label="Abrir filtros"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="container mx-auto px-4 pb-24 pt-10 sm:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Estadias selecionadas
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredListings.length === 0 && (
          <div className="glass mt-8 rounded-[2rem] border border-dashed border-border/70 py-24 text-center">
            <div className="text-6xl">🏝️</div>
            <h3 className="mt-6 text-2xl font-semibold text-foreground">
              Nenhum refúgio encontrado.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Tente outra categoria ou remova os filtros para redescobrir destinos
              incríveis.
            </p>
            <Button
              className="mt-8 h-12 rounded-full px-8 text-sm font-semibold"
              onClick={() => setActiveCategory("Tudo")}
            >
              Ver todas as estadias
            </Button>
          </div>
        )}
      </section>

    </Layout>
  );
}
