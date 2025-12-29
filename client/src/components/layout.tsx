import { Link, useLocation } from "wouter";
import { Search, Globe, Menu, User, MapPin } from "lucide-react";
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
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
              Your Place
            </span>
          </a>
        </Link>

        {/* Search Bar - Hidden on very small screens, visible elsewhere */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
              <Search className="h-4 w-4" />
            </div>
            <Input 
              placeholder="Search destinations..." 
              className="pl-10 h-10 rounded-full bg-secondary border-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-background transition-all shadow-sm hover:shadow-md"
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLocation('/search');
              }}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex rounded-full text-sm font-medium">
            Switch to hosting
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
            <Globe className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="rounded-full border-muted-foreground/20 px-2 pl-3 hover:shadow-md transition-shadow gap-2 h-10">
                <Menu className="h-5 w-5" />
                <Avatar className="h-7 w-7">
                  <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name} />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer">Messages</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Trips</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Wishlists</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer">Manage listings</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">Account</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">Log out</DropdownMenuItem>
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
      <footer className="border-t py-8 mt-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Your Place, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
