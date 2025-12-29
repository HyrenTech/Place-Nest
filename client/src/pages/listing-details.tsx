import { useRoute } from "wouter";
import Layout from "@/components/layout";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Share, Heart, Wifi, Car, UtensilsCrossed, Monitor } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ListingDetails() {
  const [match, params] = useRoute("/listing/:id");
  const listing = LISTINGS.find((l) => l.id === params?.id);
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);

  if (!match || !listing) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold">Listing not found</h1>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    setIsBooked(true);
    toast({
      title: "Booking Request Sent!",
      description: `You've requested to book ${listing.title}. The host will confirm shortly.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">{listing.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground font-medium">
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-4 w-4 fill-current" />
                {listing.rating}
              </span>
              <span>·</span>
              <span className="underline decoration-muted-foreground/30 cursor-pointer hover:text-foreground transition-colors">{listing.reviewsCount} reviews</span>
              <span>·</span>
              <span className="flex items-center gap-1 underline decoration-muted-foreground/30 cursor-pointer hover:text-foreground transition-colors">
                <MapPin className="h-4 w-4" />
                {listing.location.city}, {listing.location.country}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="gap-2 underline decoration-muted-foreground/30">
                <Share className="h-4 w-4" /> Share
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 underline decoration-muted-foreground/30">
                <Heart className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 relative">
          <div className="md:col-span-2 h-full">
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={listing.images[1]} alt="Interior 1" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            <img src={listing.images[2]} alt="Interior 2" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={listing.images[3] || listing.images[1]} alt="Detail 1" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
            <div className="relative h-full">
               <img src={listing.images[0]} alt="Detail 2" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
               <Button variant="secondary" size="sm" className="absolute bottom-4 right-4 shadow-md bg-white text-black hover:bg-white/90">
                 Show all photos
               </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex justify-between items-start pb-6 border-b border-border/40">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  {listing.type} hosted by {listing.host.name}
                </h2>
                <p className="text-muted-foreground">
                  {listing.maxGuests} guests · {listing.beds} beds · {listing.baths} baths
                </p>
              </div>
              <Avatar className="h-14 w-14 border border-border">
                <AvatarImage src={listing.host.avatar} />
                <AvatarFallback>{listing.host.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            {/* Highlights */}
            <div className="space-y-4 pb-6 border-b border-border/40">
              {listing.host.isSuperhost && (
                <div className="flex gap-4">
                  <Badge variant="outline" className="h-fit mt-1">Superhost</Badge>
                  <div>
                    <h3 className="font-semibold">{listing.host.name} is a Superhost</h3>
                    <p className="text-sm text-muted-foreground">Superhosts are experienced, highly rated hosts.</p>
                  </div>
                </div>
              )}
              <div className="flex gap-4">
                <MapPin className="h-6 w-6 text-muted-foreground mt-1" />
                <div>
                  <h3 className="font-semibold">Great location</h3>
                  <p className="text-sm text-muted-foreground">100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pb-6 border-b border-border/40">
              <p className="leading-relaxed whitespace-pre-line text-muted-foreground/90">
                {listing.description}
              </p>
              <Button variant="link" className="px-0 font-semibold text-foreground mt-2">Show more</Button>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map(item => (
                  <div key={item} className="flex items-center gap-3 text-muted-foreground/80">
                    {item === "Wifi" && <Wifi className="h-5 w-5" />}
                    {item === "Kitchen" && <UtensilsCrossed className="h-5 w-5" />}
                    {item === "Parking" && <Car className="h-5 w-5" />}
                    {item === "Workplace" && <Monitor className="h-5 w-5" />}
                    {item === "Pool" && <span className="text-lg">🏊</span>}
                    {item === "Hot tub" && <span className="text-lg">🛁</span>}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full sm:w-auto rounded-lg">Show all amenities</Button>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="relative">
            <div className="sticky top-24">
              <Card className="shadow-xl border-border/40 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-baseline mb-6">
                    <div>
                      <span className="text-2xl font-bold">${listing.price}</span>
                      <span className="text-muted-foreground"> night</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {listing.rating} · <span className="text-muted-foreground font-normal underline">{listing.reviewsCount} reviews</span>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg mb-4 overflow-hidden">
                    <div className="grid grid-cols-2 border-b border-border">
                      <div className="p-3 border-r border-border hover:bg-muted/20 cursor-pointer transition-colors">
                        <div className="text-[10px] font-bold uppercase tracking-wider">Check-in</div>
                        <div className="text-sm">Add date</div>
                      </div>
                      <div className="p-3 hover:bg-muted/20 cursor-pointer transition-colors">
                        <div className="text-[10px] font-bold uppercase tracking-wider">Checkout</div>
                        <div className="text-sm">Add date</div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-muted/20 cursor-pointer transition-colors">
                      <div className="text-[10px] font-bold uppercase tracking-wider">Guests</div>
                      <div className="text-sm">1 guest</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full text-lg h-12 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:opacity-95 transition-opacity"
                    onClick={handleBooking}
                    disabled={isBooked}
                  >
                    {isBooked ? "Request Sent" : "Reserve"}
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    You won't be charged yet
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-muted-foreground">
                      <span className="underline">${listing.price} x 5 nights</span>
                      <span>${listing.price * 5}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="underline">Cleaning fee</span>
                      <span>$75</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="underline">Service fee</span>
                      <span>$50</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span>Total</span>
                      <span>${(listing.price * 5) + 75 + 50}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
