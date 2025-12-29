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
    <div className="group relative block space-y-3.5 selection:bg-transparent">
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-3.5 cursor-pointer">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-black/[0.02] aspect-square shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <motion.img
              src={listing.images[0]}
              alt={listing.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
            
            {listing.host.isSuperhost && (
              <div className="absolute top-4 left-4 rounded-xl bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-black shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-black uppercase tracking-wider z-10 border border-black/[0.03]">
                Superhost
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.02] opacity-100 pointer-events-none" />
          </div>
        </a>
      </Link>

      <button
        className="absolute top-4 right-4 z-20 p-2 group/heart active:scale-90 transition-all duration-300"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
      >
        <Heart 
          className={`h-7 w-7 transition-all duration-500 ${
            isFavorite 
              ? "fill-primary stroke-primary scale-110 drop-shadow-[0_0_8px_rgba(255,56,92,0.4)]" 
              : "fill-black/10 stroke-white stroke-[2.5px] group-hover/heart:fill-black/20"
          }`} 
        />
      </button>
      
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-0.5 px-0.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-black text-[15.5px] leading-tight text-foreground tracking-tight">
              {listing.location.city}, {listing.location.state}
            </h3>
            <div className="flex items-center gap-1 text-[14.5px] font-bold shrink-0">
              <Star className="h-3.5 w-3.5 fill-current text-foreground" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground/60 text-[14.5px] font-bold tracking-tight">
            Disponível: 12 – 17 de mai.
          </p>
          
          <div className="flex items-baseline gap-1 pt-1.5">
            <span className="font-black text-[15.5px] tracking-tight text-foreground">R${listing.price}</span>
            <span className="text-muted-foreground/70 text-[15.5px] font-bold tracking-tight">noite</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
