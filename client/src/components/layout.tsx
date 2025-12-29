import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "wouter";
import { Search, Globe, Menu, MapPin, Heart, MessageSquare, Calendar, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CURRENT_USER } from "@/lib/mock-data";

export function Navbar() {
  const [location, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-12">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="size-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-105 transition-transform">
              <HomeIcon className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary hidden sm:block">
              Lar por Temporada
            </span>
          </a>
        </Link>

        {/* Search Bar - Airbnb Style */}
        <div className="hidden md:flex items-center h-12 px-2 border rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-background">
          <button className="px-4 text-sm font-semibold border-r">Qualquer lugar</button>
          <button className="px-4 text-sm font-semibold border-r">Qualquer semana</button>
          <button className="px-4 text-sm text-muted-foreground">Hóspedes?</button>
          <div className="bg-primary p-2 rounded-full text-primary-foreground ml-2">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="hidden lg:flex rounded-full text-sm font-semibold px-4">
            Seja um anfitrião
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
            <Globe className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="rounded-full border-muted-foreground/20 px-2 pl-3 hover:shadow-md transition-shadow gap-3 h-11">
                <Menu className="h-4 w-4" />
                <Avatar className="h-8 w-8">
                  <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-xl p-2 mt-2 shadow-xl border-border/40">
              <DropdownMenuLabel className="font-semibold text-base">Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer font-medium">Mensagens</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer font-medium">Viagens</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer font-medium">Favoritos</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer">Anunciar seu espaço</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer">Gerenciar anúncios</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer">Conta</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive">Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden sticky bottom-0 z-50 w-full bg-background border-t h-16 flex items-center justify-around px-2 pb-safe">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-medium">Explorar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <Heart className="h-6 w-6" />
          <span className="text-[10px] font-medium">Favoritos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-medium">Viagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-medium">Mensagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={CURRENT_USER.avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>

      <footer className="hidden md:block border-t py-12 mt-20 bg-secondary/20">
        <div className="container mx-auto px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Atendimento</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Central de Ajuda</li>
                <li>AirCover</li>
                <li>Antidiscriminação</li>
                <li>Apoio a pessoas com deficiência</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Hospedagem</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Anuncie seu espaço</li>
                <li>AirCover para anfitriões</li>
                <li>Recursos para anfitriões</li>
                <li>Fórum da comunidade</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-sm">Lar por Temporada</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Newsroom</li>
                <li>Novos recursos</li>
                <li>Carreiras</li>
                <li>Investidores</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4">
              <span>© 2024 Lar por Temporada, Inc.</span>
              <span className="hover:underline cursor-pointer">Privacidade</span>
              <span className="hover:underline cursor-pointer">Termos</span>
              <span className="hover:underline cursor-pointer">Mapa do site</span>
            </div>
            <div className="flex items-center gap-6 font-semibold text-foreground">
              <button className="flex items-center gap-2 hover:underline"><Globe className="h-4 w-4" /> Português (BR)</button>
              <button className="hover:underline">R$ BRL</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
