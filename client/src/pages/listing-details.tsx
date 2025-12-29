import { useRoute } from "wouter";
import Layout from "@/components/layout";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, Share, Heart, Wifi, Car, UtensilsCrossed, Monitor, ShieldCheck, ChevronRight, Award } from "lucide-react";
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
          <h1 className="text-2xl font-bold">Anúncio não encontrado</h1>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    setIsBooked(true);
    toast({
      title: "Reserva Solicitada!",
      description: `Sua solicitação para ${listing.title} foi enviada. O anfitrião responderá em breve.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-12 py-8 max-w-7xl">
        {/* Title Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{listing.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 font-bold">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                {listing.rating}
              </span>
              <span>·</span>
              <span className="underline cursor-pointer hover:text-muted-foreground">{listing.reviewsCount} comentários</span>
              <span>·</span>
              {listing.host.isSuperhost && (
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" /> Superhost
                </span>
              )}
              <span>·</span>
              <span className="underline cursor-pointer hover:text-muted-foreground font-semibold">
                {listing.location.city}, {listing.location.state}, Brasil
              </span>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="gap-2 rounded-lg font-semibold underline">
                <Share className="h-4 w-4" /> Compartilhar
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 rounded-lg font-semibold underline">
                <Heart className="h-4 w-4" /> Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Image Grid - Premium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[350px] md:h-[550px] rounded-2xl overflow-hidden mb-12 relative shadow-lg">
          <div className="md:col-span-2 h-full overflow-hidden">
            <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={listing.images[1]} alt="Interior 1" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 cursor-pointer" />
            <img src={listing.images[2] || listing.images[0]} alt="Interior 2" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 cursor-pointer" />
          </div>
          <div className="hidden md:grid grid-rows-2 gap-2 h-full">
            <img src={listing.images[3] || listing.images[1]} alt="Detail 1" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 cursor-pointer" />
            <div className="relative h-full">
               <img src={listing.images[0]} alt="Detail 2" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 cursor-pointer" />
               <Button variant="outline" size="sm" className="absolute bottom-6 right-6 shadow-xl bg-white text-black hover:bg-white/95 font-bold rounded-xl border-black h-10">
                 Mostrar todas as fotos
               </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {listing.type} inteiro hospedado por {listing.host.name}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {listing.maxGuests} hóspedes · {listing.beds} quartos · {listing.beds} camas · {listing.baths} banheiros
                </p>
              </div>
              <Avatar className="h-16 w-16 shadow-md">
                <AvatarImage src={listing.host.avatar} />
                <AvatarFallback>{listing.host.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <Separator />

            {/* Highlights */}
            <div className="space-y-6">
              {listing.host.isSuperhost && (
                <div className="flex gap-6 items-start">
                  <Award className="h-7 w-7 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">{listing.host.name} é um Superhost</h3>
                    <p className="text-muted-foreground">Superhosts são anfitriões experientes e muito bem avaliados.</p>
                  </div>
                </div>
              )}
              <div className="flex gap-6 items-start">
                <MapPin className="h-7 w-7 text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Localização fantástica</h3>
                  <p className="text-muted-foreground">100% dos hóspedes recentes deram 5 estrelas para a localização.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <ShieldCheck className="h-7 w-7 text-primary mt-1" />
                <div>
                  <h3 className="font-bold text-lg">Cancelamento gratuito por 48 horas</h3>
                  <p className="text-muted-foreground">Fique tranquilo caso seus planos mudem.</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* AirCover Mock */}
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-primary">Lar</span>
                <span className="text-2xl font-black">Cover</span>
              </div>
              <p className="text-muted-foreground">
                Toda reserva inclui proteção gratuita contra cancelamentos feitos pelo anfitrião, informações incorretas no anúncio e outros problemas, como dificuldades no check-in.
              </p>
              <Button variant="link" className="p-0 font-bold text-lg h-fit underline">Saiba mais</Button>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground/90 font-medium">
                {listing.description}
              </p>
              <Button variant="ghost" className="p-0 font-bold text-lg h-fit underline flex items-center gap-1">
                Mostrar mais <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            {/* Amenities */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">O que este lugar oferece</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {listing.amenities.map(item => (
                  <div key={item} className="flex items-center gap-4 text-lg text-muted-foreground/90 font-medium">
                    {item === "Wifi" && <Wifi className="h-6 w-6" />}
                    {item === "Cozinha" && <UtensilsCrossed className="h-6 w-6" />}
                    {item === "Estacionamento" && <Car className="h-6 w-6" />}
                    {item === "Escritório" && <Monitor className="h-6 w-6" />}
                    {item === "Piscina" && <span className="text-2xl">🏊</span>}
                    {item === "Vista Mar" && <span className="text-2xl">🌊</span>}
                    {item === "Jacuzzi" && <span className="text-2xl">🛁</span>}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 rounded-xl px-8 h-12 font-bold text-lg border-black">
                Mostrar todas as comodidades (18)
              </Button>
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="relative lg:block">
            <div className="sticky top-28">
              <Card className="shadow-2xl border-border/40 rounded-3xl overflow-hidden p-1">
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-2xl font-black">R${listing.price}</span>
                      <span className="text-muted-foreground font-medium text-lg"> / noite</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                      <Star className="h-4 w-4 fill-current" />
                      {listing.rating} · <span className="text-muted-foreground font-semibold underline">{listing.reviewsCount} comentários</span>
                    </div>
                  </div>

                  <div className="border border-border/60 rounded-xl overflow-hidden shadow-sm">
                    <div className="grid grid-cols-2 border-b border-border/60">
                      <div className="p-4 border-r border-border/60 hover:bg-muted/10 cursor-pointer transition-colors">
                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Check-in</div>
                        <div className="text-sm font-medium">Adicionar data</div>
                      </div>
                      <div className="p-4 hover:bg-muted/10 cursor-pointer transition-colors">
                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Checkout</div>
                        <div className="text-sm font-medium">Adicionar data</div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-muted/10 cursor-pointer transition-colors flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-foreground">Hóspedes</div>
                        <div className="text-sm font-medium">1 hóspede</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full text-xl h-14 rounded-xl bg-primary hover:opacity-95 transition-all shadow-lg font-bold"
                    onClick={handleBooking}
                    disabled={isBooked}
                  >
                    {isBooked ? "Solicitação Enviada" : "Reservar Agora"}
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground font-medium">
                    Você ainda não será cobrado
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between text-lg text-muted-foreground/90 font-medium">
                      <span className="underline">R${listing.price} x 5 noites</span>
                      <span>R${listing.price * 5}</span>
                    </div>
                    <div className="flex justify-between text-lg text-muted-foreground/90 font-medium">
                      <span className="underline">Taxa de limpeza</span>
                      <span>R$150</span>
                    </div>
                    <div className="flex justify-between text-lg text-muted-foreground/90 font-medium">
                      <span className="underline">Taxa de serviço</span>
                      <span>R$220</span>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex justify-between font-black text-xl">
                      <span>Total (BRL)</span>
                      <span>R${(listing.price * 5) + 150 + 220}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-8 border rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                <div>
                  <h4 className="font-bold text-lg">Este é um achado raro.</h4>
                  <p className="text-muted-foreground">O lugar de {listing.host.name} costuma estar sempre ocupado.</p>
                </div>
                <div className="text-3xl">💎</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
