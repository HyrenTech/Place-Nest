import { Link } from "wouter";
import { Star, Heart } from "lucide-react";
import { Listing } from "@/lib/mock-data";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <a className="group block space-y-3 cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl bg-secondary/50">
          <AspectRatio ratio={1} className="w-full">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/5 text-white hover:bg-black/15 transition-all p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-6 w-6 stroke-[2px] drop-shadow-sm" />
          </Button>
          {listing.host.isSuperhost && (
            <div className="absolute top-4 left-4 rounded-lg bg-white/95 backdrop-blur px-3 py-1 text-xs font-bold shadow-sm text-black uppercase tracking-wider">
              Superhost
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-base leading-tight truncate pr-2">
              {listing.location.city}, {listing.location.state}
            </h3>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{listing.rating.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-[15px] line-clamp-1">
            {listing.title}
          </p>
          <p className="text-[15px] text-muted-foreground">
            {listing.type} • {listing.beds} {listing.beds > 1 ? 'camas' : 'cama'}
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-bold text-base">R${listing.price}</span>
            <span className="text-muted-foreground text-sm">noite</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
