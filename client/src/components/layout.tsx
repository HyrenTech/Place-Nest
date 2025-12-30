import { Link, useLocation } from "wouter";
import { Search, Menu, Heart, MessageSquare, Calendar, Home as HomeIcon, LogOut, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CURRENT_USER } from "@/lib/mock-data";
import { motion } from "framer-motion";
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isScrolled
          ? "h-14 bg-white/75 backdrop-blur-xl border-b border-border/60 shadow-[var(--shadow-sm)]"
          : "h-16 bg-white/60 backdrop-blur border-b border-border/30"
      }`}
    >
      <div className="container mx-auto flex h-full items-center gap-3 px-4 md:px-10">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2.5 group shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="size-9 rounded-xl bg-primary/90 flex items-center justify-center text-primary-foreground shadow-[0_10px_22px_rgba(241,95,85,0.35)] transition-all duration-300"
            >
              <HomeIcon className="h-5 w-5" />
            </motion.div>
            <div className="flex flex-col -space-y-1.5 ml-0.5">
              <span className="text-[16px] font-semibold tracking-tight text-foreground hidden lg:block">
                Lar por
              </span>
              <span className="text-[16px] font-semibold tracking-tight text-primary hidden lg:block">
                Temporada
              </span>
            </div>
          </a>
        </Link>

        {/* Search Bar - True Apple Refinement */}
        <div className="hidden md:flex flex-1 justify-center px-4 min-w-0">
          <motion.div
            layout
            className="flex w-full max-w-[560px] items-center overflow-hidden rounded-full border border-border/60 bg-white/70 shadow-[var(--shadow-sm)] transition-all duration-500"
          >
            <div className="px-4 text-[12.5px] font-semibold text-foreground">
              Qualquer lugar
            </div>
            <div className="h-6 w-px bg-border/60" />
            <div className="px-4 text-[12.5px] font-semibold text-foreground">
              Semana
            </div>
            <div className="h-6 w-px bg-border/60" />
            <div className="flex-1 px-4 text-[12.5px] font-medium text-muted-foreground/70">
              Hóspedes?
            </div>
            <button
              type="button"
              aria-label="Buscar"
              className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_16px_rgba(241,95,85,0.35)]"
            >
              <Search className="h-3.5 w-3.5 stroke-[3px]" />
            </button>
          </motion.div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
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
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Acesso rápido</p>
              </div>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-semibold focus:bg-muted/80">
                <MessageSquare className="mr-3 h-4 w-4" /> Mensagens
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-semibold focus:bg-muted/80">
                <Calendar className="mr-3 h-4 w-4" /> Viagens
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer font-semibold focus:bg-muted/80">
                <Heart className="mr-3 h-4 w-4" /> Favoritos
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer focus:bg-muted/80">Anunciar seu espaço</DropdownMenuItem>
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer focus:bg-muted/80">Conta</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-xl py-3 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 font-semibold">
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
    <div className="min-h-screen bg-transparent font-sans text-foreground flex flex-col selection:bg-primary/20">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      
      {/* Mobile Bottom Nav - Refined */}
      <div className="md:hidden sticky bottom-0 z-50 w-full bg-white/80 backdrop-blur-lg border-t border-border/60 h-16 flex items-center justify-around px-2 pb-safe shadow-[0_-6px_20px_rgba(15,23,42,0.1)]">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Search className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Explorar</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <Heart className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Favoritos</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Viagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <MessageSquare className="h-6 w-6" />
          <span className="text-[10px] font-semibold">Mensagens</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
          <Avatar className="h-6 w-6 border-2 border-transparent hover:border-border transition-all">
            <AvatarImage src={CURRENT_USER.avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="text-[10px] font-semibold">Perfil</span>
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
