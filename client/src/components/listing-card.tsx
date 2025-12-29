import { useState } from "react";
import { Link } from "wouter";
import { Star, Heart, Share, MoreHorizontal } from "lucide-react";
import { Listing } from "@/lib/mock-data";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group relative block space-y-3 selection:bg-transparent">
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-3 cursor-pointer">
          <div className="relative overflow-hidden rounded-[1.25rem] bg-secondary/30 aspect-square shadow-sm group-hover:shadow-md transition-all">
            <motion.img
              src={listing.images[0]}
              alt={listing.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="h-full w-full object-cover"
            />
            
            {listing.host.isSuperhost && (
              <div className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur-[2px] px-3 py-1.5 text-[11px] font-black shadow-sm text-black uppercase tracking-widest z-10 border border-black/5">
                Superhost
              </div>
            )}
            
            {/* Image Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </a>
      </Link>

      {/* Heart Button - Separate from Link to allow direct interaction */}
      <button
        className="absolute top-4 right-4 z-20 p-2 text-white hover:scale-110 active:scale-90 transition-all drop-shadow-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Heart className="h-7 w-7 stroke-white stroke-[2.5px] fill-black/30 hover:fill-primary hover:stroke-primary transition-colors" />
      </button>
      
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-[15px] leading-tight truncate text-foreground/90">
              {listing.location.city}, {listing.location.state}
            </h3>
            <div className="flex items-center gap-1 text-[14px] font-medium shrink-0">
              <Star className="h-3 w-3 fill-current" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-[14px] line-clamp-1 font-medium">
            A {listing.location.city.length > 10 ? 'alguns' : 'muitos'} km de distância
          </p>
          <p className="text-[14px] text-muted-foreground font-medium">
            Disponível: 5 – 10 de mai.
          </p>
          
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="font-bold text-[15px]">R${listing.price}</span>
            <span className="text-muted-foreground text-[15px] font-medium">noite</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
