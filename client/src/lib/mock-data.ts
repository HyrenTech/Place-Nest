import { addDays } from "date-fns";

export interface User {
  id: string;
  name: string;
  avatar: string;
  isSuperhost: boolean;
  rating: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: "Apartamento" | "Casa" | "Vila" | "Cabana" | "Loft" | "Frente ao Mar" | "Design" | "UAU!";
  location: {
    city: string;
    state: string;
    country: string;
    address: string;
  };
  price: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  host: User;
  reviews: Review[];
  maxGuests: number;
  beds: number;
  baths: number;
}

export const CURRENT_USER: User = {
  id: "u1",
  name: "Alex Silva",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  isSuperhost: false,
  rating: 0,
};

export const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Vila de Vidro Moderna com Vista para o Mar",
    description: "Experimente o máximo em luxo nesta deslumbrante vila de vidro com vista para o Oceano Atlântico em Angra dos Reis. Com janelas do chão ao teto, piscina de borda infinita e cozinha gourmet.",
    type: "Vila",
    location: { city: "Angra dos Reis", state: "RJ", country: "Brasil", address: "Estrada do Contorno, 123" },
    price: 1850,
    rating: 4.98,
    reviewsCount: 156,
    images: ["https://images.unsplash.com/photo-1600596542815-37a9a2d18ac4", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"],
    amenities: ["Wifi", "Piscina", "Cozinha", "Ar condicionado", "Estacionamento"],
    host: { id: "h1", name: "Ana Beatriz", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", isSuperhost: true, rating: 4.9 },
    reviews: [],
    maxGuests: 8, beds: 4, baths: 4
  },
  {
    id: "2",
    title: "Loft Minimalista na Vila Madalena",
    description: "Espaçoso loft de estilo industrial-chic no coração do bairro mais artístico de São Paulo. Tetos altos, tijolos expostos e móveis de design.",
    type: "Loft",
    location: { city: "São Paulo", state: "SP", country: "Brasil", address: "Rua Harmonia, 456" },
    price: 420,
    rating: 4.88,
    reviewsCount: 92,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", "https://images.unsplash.com/photo-1505691938895-1758d7feb511"],
    amenities: ["Wifi", "Cozinha", "Elevador", "Lavanderia"],
    host: { id: "h2", name: "Ricardo Santos", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", isSuperhost: false, rating: 4.7 },
    reviews: [],
    maxGuests: 2, beds: 1, baths: 1
  },
  {
    id: "3",
    title: "Cabana Ecológica na Serra da Mantiqueira",
    description: "Desconecte-se nesta cabana sustentável cercada por mata nativa. Perfeita para amantes da natureza e retiros criativos em Campos do Jordão.",
    type: "Cabana",
    location: { city: "Campos do Jordão", state: "SP", country: "Brasil", address: "Caminho das Nuvens, 789" },
    price: 280,
    rating: 4.95,
    reviewsCount: 210,
    images: ["https://images.unsplash.com/photo-1449156493391-d2cfa28e468b", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"],
    amenities: ["Lareira", "Estacionamento", "Pet friendly", "Jardim"],
    host: { id: "h3", name: "Helena Oliveira", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", isSuperhost: true, rating: 4.98 },
    reviews: [],
    maxGuests: 4, beds: 2, baths: 1
  },
  {
    id: "4",
    title: "Casa de Design no Quadrado de Trancoso",
    description: "Projeto arquitetônico premiado a poucos passos do famoso Quadrado. Uma fusão perfeita entre o rústico baiano e o luxo contemporâneo.",
    type: "Design",
    location: { city: "Trancoso", state: "BA", country: "Brasil", address: "Praça do Quadrado, s/n" },
    price: 2500,
    rating: 5.0,
    reviewsCount: 34,
    images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    amenities: ["Piscina", "Wifi", "Ar condicionado", "Cozinha", "Jacuzzi"],
    host: { id: "h4", name: "James S.", avatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6", isSuperhost: true, rating: 5.0 },
    reviews: [],
    maxGuests: 6, beds: 3, baths: 4
  },
  {
    id: "5",
    title: "Apartamento Frente ao Mar em Ipanema",
    description: "Acorde com o som das ondas neste apartamento luxuoso com vista frontal para a praia de Ipanema. Totalmente reformado.",
    type: "Frente ao Mar",
    location: { city: "Rio de Janeiro", state: "RJ", country: "Brasil", address: "Av. Vieira Souto, 101" },
    price: 1200,
    rating: 4.92,
    reviewsCount: 128,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688", "https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    amenities: ["Vista Mar", "Wifi", "Ar condicionado", "Cozinha", "Portaria 24h"],
    host: { id: "h5", name: "Marcelo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", isSuperhost: true, rating: 4.8 },
    reviews: [],
    maxGuests: 4, beds: 2, baths: 2
  },
  {
    id: "6",
    title: "Bolha Geodésica nas Estrelas",
    description: "Duma experiência surreal dormindo sob o céu estrelado em uma bolha transparente com todo o conforto de um hotel 5 estrelas.",
    type: "UAU!",
    location: { city: "Urubici", state: "SC", country: "Brasil", address: "Topo do Morro, km 15" },
    price: 950,
    rating: 4.99,
    reviewsCount: 45,
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2", "https://images.unsplash.com/photo-1464146072230-91cabc968266"],
    amenities: ["Telescópio", "Café da manhã", "Banheira", "Aquecimento"],
    host: { id: "h6", name: "Fábio", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", isSuperhost: true, rating: 5.0 },
    reviews: [],
    maxGuests: 2, beds: 1, baths: 1
  }
];
