import { Link } from "wouter";
import { Star } from "lucide-react";
import { Listing } from "@/lib/mock-data";
import { motion } from "framer-motion";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="group relative">
      <Link href={`/listing/${listing.id}`}>
        <a className="block">
          <div className="relative overflow-hidden rounded-[1.9rem] border border-white/70 bg-white/70 shadow-sm transition-all duration-500 group-hover:shadow-[var(--shadow-md)]">
            <motion.img
              src={listing.images[0]}
              alt={listing.title}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
            {listing.host.isSuperhost && (
              <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground shadow-sm">
                Superhost
              </div>
            )}
          </div>
        </a>
      </Link>

      <Link href={`/listing/${listing.id}`}>
        <a className="block px-1 pt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold leading-tight text-foreground">
              {listing.location.city}, {listing.location.state}
            </h3>
            <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Star className="h-3.5 w-3.5 fill-current" />
              {listing.rating.toFixed(2)}
            </div>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Disponível: 12 – 17 de mai.
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-[15px] font-semibold text-foreground">
              R${listing.price}
            </span>
            <span className="text-sm text-muted-foreground">noite</span>
          </div>
        </a>
      </Link>
    </div>
  );
}
