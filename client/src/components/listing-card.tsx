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
    <div className="group relative block space-y-4 selection:bg-transparent">
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-4 cursor-pointer">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-black/[0.03] aspect-square shadow-sm hover:shadow-xl transition-all duration-500 ease-out">
            <motion.img
              src={listing.images[0]}
              alt={listing.title}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
            
            {listing.host.isSuperhost && (
              <div className="absolute top-5 left-5 rounded-xl bg-white/90 backdrop-blur-md px-4 py-2 text-[12px] font-extrabold shadow-lg text-black uppercase tracking-wider z-10 border border-black/5">
                Superhost
              </div>
            )}
            
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-60 pointer-events-none" />
          </div>
        </a>
      </Link>

      {/* Heart Button - Apple Style */}
      <button
        className="absolute top-5 right-5 z-20 p-2 text-white hover:scale-110 active:scale-90 transition-all drop-shadow-2xl"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
      >
        <Heart className={`h-8 w-8 stroke-white stroke-[2.5px] transition-all duration-300 ${isFavorite ? "fill-primary stroke-primary" : "fill-black/20 hover:fill-black/40"}`} />
      </button>
      
      <Link href={`/listing/${listing.id}`}>
        <a className="block space-y-1.5 px-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-extrabold text-[16px] leading-tight text-foreground tracking-tight">
              {listing.location.city}, {listing.location.state}
            </h3>
            <div className="flex items-center gap-1.5 text-[15px] font-bold shrink-0">
              <Star className="h-3.5 w-3.5 fill-current text-foreground" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground/80 text-[15px] font-bold tracking-tight">
            Distância não informada
          </p>
          <p className="text-[15px] text-muted-foreground/60 font-semibold tracking-tight">
            12 – 17 de mai.
          </p>
          
          <div className="flex items-baseline gap-1.5 pt-1.5">
            <span className="font-extrabold text-[17px] tracking-tight">R${listing.price}</span>
            <span className="text-muted-foreground text-[16px] font-bold">noite</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
