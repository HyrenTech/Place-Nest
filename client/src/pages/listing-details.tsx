import { useRoute } from "wouter";
import Layout from "@/components/layout";
import { LISTINGS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Wifi,
  Car,
  UtensilsCrossed,
  Monitor,
  ChevronRight,
  Users,
  BedDouble,
  Bath,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FALLBACK_REVIEWS = [
  {
    id: "r1",
    userId: "u1",
    userName: "Marina Costa",
    userAvatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=80&q=80",
    rating: 5,
    date: "Abril 2024",
    comment:
      "Tudo impecável. A casa é ainda mais bonita ao vivo e o anfitrião cuidou de cada detalhe.",
  },
  {
    id: "r2",
    userId: "u2",
    userName: "Paulo Henrique",
    userAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    rating: 4.95,
    date: "Março 2024",
    comment:
      "Silêncio, conforto e vista incrível. Reservaria novamente sem pensar duas vezes.",
  },
];

export default function ListingDetails() {
  const [match, params] = useRoute("/listing/:id");
  const listing = LISTINGS.find((item) => item.id === params?.id);
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);

  if (!match || !listing) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <h1 className="text-2xl font-semibold">Anúncio não encontrado</h1>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    setIsBooked(true);
    toast({
      title: "Reserva solicitada!",
      description: `Sua solicitação para ${listing.title} foi enviada. O anfitrião responderá em breve.`,
    });
  };

  const reviews = listing.reviews.length ? listing.reviews.slice(0, 2) : FALLBACK_REVIEWS;

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 left-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(250,214,198,0.45),rgba(250,214,198,0))] blur-3xl" />
        <div className="absolute top-8 right-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(183,220,245,0.45),rgba(183,220,245,0))] blur-3xl" />
        <div className="container mx-auto px-4 pb-10 pt-10 sm:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {listing.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-foreground">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">{listing.rating.toFixed(2)}</span>
                  <span className="text-muted-foreground">
                    ({listing.reviewsCount} avaliações)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {listing.location.city}, {listing.location.state}, Brasil
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-12">
        <div className="grid gap-4">
          <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[var(--shadow-md)]">
            <img
              src={listing.images[0]}
              alt={listing.title}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80">
              <img
                src={listing.images[1]}
                alt="Interior"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/80">
              <img
                src={listing.images[2] || listing.images[0]}
                alt="Detalhes"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-12 px-4 pb-24 pt-12 sm:px-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {listing.type} inteiro hospedado por {listing.host.name}
                </h2>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {listing.maxGuests} hóspedes
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4" />
                    {listing.beds} quartos
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4" />
                    {listing.baths} banheiros
                  </div>
                </div>
              </div>
              <Avatar className="h-14 w-14 border border-white/70 shadow-sm">
                <AvatarImage src={listing.host.avatar} />
                <AvatarFallback>{listing.host.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Sobre esta estadia</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {listing.description}
            </p>
            <Button variant="ghost" className="h-fit p-0 text-sm font-semibold">
              Mostrar mais <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator />

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              O que este lugar oferece
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {listing.amenities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-sm text-muted-foreground"
                >
                  {item === "Wifi" && <Wifi className="h-4 w-4" />}
                  {item === "Cozinha" && <UtensilsCrossed className="h-4 w-4" />}
                  {item === "Estacionamento" && <Car className="h-4 w-4" />}
                  {item === "Escritório" && <Monitor className="h-4 w-4" />}
                  {item === "Piscina" && <span className="text-base">🏊</span>}
                  {item === "Vista Mar" && <span className="text-base">🌊</span>}
                  {item === "Jacuzzi" && <span className="text-base">🛁</span>}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="h-11 rounded-full px-6 text-sm font-semibold">
              Mostrar todas as comodidades
            </Button>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Avaliações</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-current text-foreground" />
                {listing.rating.toFixed(2)} • {listing.reviewsCount} avaliações
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {review.userName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[var(--shadow-md)]">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-semibold text-foreground">
                R${listing.price}
              </div>
              <div className="text-sm text-muted-foreground">/ noite</div>
            </div>
            <div className="mt-6 rounded-2xl border border-border/60 bg-white/80">
              <div className="grid grid-cols-2 border-b border-border/60">
                <div className="p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Check-in
                  </div>
                  <div className="text-sm text-foreground">Adicionar data</div>
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    Checkout
                  </div>
                  <div className="text-sm text-foreground">Adicionar data</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Hóspedes
                </div>
                <div className="text-sm text-foreground">1 hóspede</div>
              </div>
            </div>
            <Button
              className="mt-6 w-full rounded-full text-sm font-semibold"
              onClick={handleBooking}
              disabled={isBooked}
            >
              {isBooked ? "Solicitação enviada" : "Reservar agora"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Você ainda não será cobrado
            </p>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>R${listing.price} x 5 noites</span>
                <span>R${listing.price * 5}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de limpeza</span>
                <span>R$150</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de serviço</span>
                <span>R$220</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-semibold text-foreground">
                <span>Total</span>
                <span>R${listing.price * 5 + 150 + 220}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </Layout>
  );
}
