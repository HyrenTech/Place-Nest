import { useState } from "react";
import Layout from "@/components/layout";
import { ListingCard } from "@/components/listing-card";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useLocation } from "wouter";

const CATEGORIES = [
  { label: "Tudo", icon: "🏠" },
  { label: "Vilas", icon: "🏰" },
  { label: "Apartamento", icon: "🏢" },
  { label: "Cabana", icon: "🌲" },
  { label: "Frente ao Mar", icon: "🏖️" },
  { label: "Design", icon: "🎨" },
  { label: "UAU!", icon: "🛸" },
  { label: "Piscinas incríveis", icon: "🏊" },
  { label: "Fazendas", icon: "🚜" },
  { label: "Pé na areia", icon: "👣" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tudo");
  const [, setLocation] = useLocation();

  const filteredListings = activeCategory === "Tudo" 
    ? LISTINGS 
    : LISTINGS.filter(l => l.type === activeCategory || (activeCategory === "Frente ao Mar" && l.type === "Frente ao Mar"));

  return (
    <Layout>
      {/* Search Section Mobile */}
      <section className="pt-6 pb-2 px-4 md:hidden">
        <div 
          className="bg-card rounded-full shadow-lg border p-3 flex items-center gap-4 cursor-pointer hover:bg-muted/10 transition-colors"
          onClick={() => setLocation("/search")}
        >
          <div className="bg-primary p-2.5 rounded-full text-primary-foreground ml-1">
            <Search className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm">Onde você quer ir?</div>
            <div className="text-xs text-muted-foreground">Qualquer lugar • Qualquer semana • Adicionar hóspedes</div>
          </div>
          <div className="mr-2 p-2 border rounded-full">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40 py-2 sm:py-4">
        <div className="container mx-auto px-4 sm:px-12 flex items-center gap-4">
          <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex gap-8 min-w-max pb-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex flex-col items-center gap-2 group cursor-pointer transition-all min-w-[64px] pb-2 border-b-2 ${
                    activeCategory === cat.label 
                      ? "text-foreground border-foreground opacity-100" 
                      : "text-muted-foreground border-transparent opacity-70 hover:opacity-100 hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
                  <span className="text-xs font-semibold whitespace-nowrap">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 rounded-xl h-12 px-4 border-border/60">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-xs font-bold">Filtros</span>
          </Button>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="container mx-auto px-4 sm:px-12 pt-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        
        {filteredListings.length === 0 && (
          <div className="text-center py-32">
            <div className="text-5xl mb-6">🏝️</div>
            <h3 className="text-2xl font-bold mb-3">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground text-lg">Tente selecionar outra categoria ou remover os filtros.</p>
            <Button variant="outline" className="mt-8 rounded-xl px-8 h-12 font-bold" onClick={() => setActiveCategory("Tudo")}>Ver todos os anúncios</Button>
          </div>
        )}
      </section>

      {/* Floating Map Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 md:bottom-32">
        <Button className="rounded-full h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl font-bold gap-2 group">
          Mostrar mapa 🗺️
        </Button>
      </div>
    </Layout>
  );
}
