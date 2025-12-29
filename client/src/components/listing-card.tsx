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
        <div className="relative overflow-hidden rounded-xl bg-secondary/50">
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
            className="absolute top-3 right-3 rounded-full bg-black/10 text-white hover:bg-black/20 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-5 w-5" />
          </Button>
          {listing.host.isSuperhost && (
            <div className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur px-2 py-1 text-xs font-semibold shadow-sm">
              Superhost
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-base leading-tight truncate pr-2">
              {listing.location.city}, {listing.location.country}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{listing.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-1">
            {listing.title}
          </p>
          <p className="text-sm text-muted-foreground">
            {listing.type} • {listing.beds} beds
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-semibold text-base">${listing.price}</span>
            <span className="text-muted-foreground text-sm">night</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
