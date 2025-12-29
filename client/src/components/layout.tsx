import { Link, useLocation } from "wouter";
import { Search, Globe, Menu, MapPin, Heart, MessageSquare, Calendar, Home as HomeIcon, LogOut, User as UserIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isScrolled ? "h-16 border-border/40 bg-background/80 backdrop-blur-md" : "h-20 border-transparent bg-background"
    }`}>
      <div className="container mx-auto flex h-full items-center justify-between px-4 sm:px-12">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="size-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:shadow-md transition-all"
            >
              <HomeIcon className="h-5 w-5" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight text-primary hidden sm:block">
              Lar por Temporada
            </span>
          </a>
        </Link>

        {/* Search Bar - Enhanced */}
        <motion.div 
          layout
          className="hidden md:flex items-center h-12 px-2 border rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer bg-background group"
        >
          <button className="px-5 text-sm font-bold border-r hover:bg-muted/30 h-full rounded-l-full transition-colors">Qualquer lugar</button>
          <button className="px-5 text-sm font-bold border-r hover:bg-muted/30 h-full transition-colors">Qualquer semana</button>
          <button className="px-5 text-sm text-muted-foreground hover:bg-muted/30 h-full rounded-r-full transition-colors">Hóspedes?</button>
          <div className="bg-primary p-2.5 rounded-full text-primary-foreground ml-2 group-hover:scale-105 transition-transform shadow-sm">
            <Search className="h-4 w-4" />
          </div>
        </motion.div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="sm" className="hidden lg:flex rounded-full text-sm font-bold px-4 hover:bg-muted/50">
            Seja um anfitrião
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full hover:bg-muted/50">
            <Globe className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="rounded-full border-border/60 px-2 pl-3 hover:shadow-md transition-all gap-3 h-11 bg-background">
                <Menu className="h-4 w-4" />
                <Avatar className="h-8 w-8 border border-border/20 shadow-inner">
                  <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
                  <AvatarFallback>{CURRENT_USER.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 mt-3 shadow-2xl border-border/40 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-2 mb-1">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Acesso rápido</p>
              </div>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-bold focus:bg-muted/80">
                <MessageSquare className="mr-3 h-4 w-4" /> Mensagens
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-bold focus:bg-muted/80">
                <Calendar className="mr-3 h-4 w-4" /> Viagens
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-bold focus:bg-muted/80">
                <Heart className="mr-3 h-4 w-4" /> Favoritos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer focus:bg-muted/80">Anunciar seu espaço</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer focus:bg-muted/80">Conta</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-bold">
                <LogOut className="mr-3 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      
      {/* Mobile Bottom Nav - Refined */}
      <div className="md:hidden sticky bottom-0 z-50 w-full bg-background/95 backdrop-blur-lg border-t h-16 flex items-center justify-around px-2 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-bold">Explorar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <Heart className="h-6 w-6" />
          <span className="text-[10px] font-bold">Favoritos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-bold">Viagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-bold">Mensagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <Avatar className="h-6 w-6 border-2 border-transparent hover:border-border transition-all">
            <AvatarImage src={CURRENT_USER.avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>

      <footer className="hidden md:block border-t py-16 mt-20 bg-secondary/10">
        <div className="container mx-auto px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">Atendimento</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="hover:underline cursor-pointer">Central de Ajuda</li>
                <li className="hover:underline cursor-pointer">AirCover</li>
                <li className="hover:underline cursor-pointer">Antidiscriminação</li>
                <li className="hover:underline cursor-pointer">Apoio a pessoas com deficiência</li>
                <li className="hover:underline cursor-pointer">Opções de cancelamento</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">Hospedagem</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="hover:underline cursor-pointer font-bold text-foreground">Anuncie seu espaço</li>
                <li className="hover:underline cursor-pointer">AirCover para anfitriões</li>
                <li className="hover:underline cursor-pointer">Recursos para anfitriões</li>
                <li className="hover:underline cursor-pointer">Fórum da comunidade</li>
                <li className="hover:underline cursor-pointer">Hospedagem responsável</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">Lar por Temporada</h4>
              <ul className="text-sm text-muted-foreground space-y-3">
                <li className="hover:underline cursor-pointer">Newsroom</li>
                <li className="hover:underline cursor-pointer">Novos recursos</li>
                <li className="hover:underline cursor-pointer">Carreiras</li>
                <li className="hover:underline cursor-pointer">Investidores</li>
                <li className="hover:underline cursor-pointer">Locais de interesse</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">Social</h4>
              <div className="flex gap-4">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <Globe className="h-4 w-4" />
                </div>
                {/* Outros ícones sociais poderiam vir aqui */}
              </div>
            </div>
          </div>
          <Separator className="my-10 border-border/40" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span className="font-medium">© 2024 Lar por Temporada, Inc.</span>
              <span className="hover:underline cursor-pointer transition-colors">Privacidade</span>
              <span className="hover:underline cursor-pointer transition-colors">Termos</span>
              <span className="hover:underline cursor-pointer transition-colors">Mapa do site</span>
              <span className="hover:underline cursor-pointer transition-colors">Informações da empresa</span>
            </div>
            <div className="flex items-center gap-8 font-bold text-foreground">
              <button className="flex items-center gap-2 hover:bg-muted/50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-border"><Globe className="h-4 w-4" /> Português (BR)</button>
              <button className="hover:bg-muted/50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-border">R$ BRL</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
