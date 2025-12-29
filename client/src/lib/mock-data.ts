import { addDays, subDays } from "date-fns";

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
  type: "Apartment" | "House" | "Villa" | "Cabin" | "Loft";
  location: {
    city: string;
    country: string;
    address: string;
    lat: number;
    lng: number;
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
  name: "Alex Morgan",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  isSuperhost: false,
  rating: 0,
};

export const LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern Glass Villa with Ocean Views",
    description: "Experience the ultimate in luxury living in this stunning glass villa overlooking the Pacific Ocean. Featuring floor-to-ceiling windows, an infinity pool, and a private chef's kitchen.",
    type: "Villa",
    location: {
      city: "Malibu",
      country: "United States",
      address: "123 Coastline Hwy",
      lat: 34.0259,
      lng: -118.7798
    },
    price: 850,
    rating: 4.95,
    reviewsCount: 128,
    images: [
      "https://images.unsplash.com/photo-1600596542815-37a9a2d18ac4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Pool", "Kitchen", "Air conditioning", "Workplace"],
    host: {
      id: "h1",
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      isSuperhost: true,
      rating: 4.9
    },
    reviews: [
      {
        id: "r1",
        userId: "u2",
        userName: "Michael Chen",
        userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2023-10-15",
        comment: "Absolutely breathtaking views. The house was spotless and Sarah was a fantastic host."
      }
    ],
    maxGuests: 6,
    beds: 3,
    baths: 3
  },
  {
    id: "2",
    title: "Minimalist Loft in Downtown Arts District",
    description: "A spacious, industrial-chic loft in the heart of the city. High ceilings, exposed brick, and curated mid-century modern furniture make this the perfect urban retreat.",
    type: "Loft",
    location: {
      city: "New York",
      country: "United States",
      address: "456 Broadway",
      lat: 40.7209,
      lng: -74.0007
    },
    price: 320,
    rating: 4.85,
    reviewsCount: 84,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Kitchen", "Elevator", "Washer", "Dryer"],
    host: {
      id: "h2",
      name: "David Ross",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      isSuperhost: false,
      rating: 4.7
    },
    reviews: [],
    maxGuests: 2,
    beds: 1,
    baths: 1
  },
  {
    id: "3",
    title: "Eco-Friendly Cabin in the Woods",
    description: "Unplug and unwind in this sustainable off-grid cabin. Surrounded by ancient pines, this is the perfect spot for nature lovers and creative retreats.",
    type: "Cabin",
    location: {
      city: "Portland",
      country: "United States",
      address: "789 Forest Rd",
      lat: 45.5152,
      lng: -122.6784
    },
    price: 180,
    rating: 4.92,
    reviewsCount: 256,
    images: [
      "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Fireplace", "Parking", "Pets allowed", "Garden"],
    host: {
      id: "h3",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      isSuperhost: true,
      rating: 4.98
    },
    reviews: [],
    maxGuests: 4,
    beds: 2,
    baths: 1
  },
  {
    id: "4",
    title: "Luxury Penthouse with City Panorama",
    description: "Top floor penthouse offering 360-degree views of the skyline. Private terrace, jacuzzi, and premium concierge service included.",
    type: "Apartment",
    location: {
      city: "Chicago",
      country: "United States",
      address: "101 Michigan Ave",
      lat: 41.8781,
      lng: -87.6298
    },
    price: 1200,
    rating: 5.0,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1512918760532-3edbed71741b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229766-5283522a6948?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Pool", "Gym", "Doorman", "Hot tub"],
    host: {
      id: "h4",
      name: "James Sterling",
      avatar: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=150&q=80",
      isSuperhost: true,
      rating: 5.0
    },
    reviews: [],
    maxGuests: 4,
    beds: 2,
    baths: 2.5
  },
  {
    id: "5",
    title: "Secluded Beach House",
    description: "Step directly onto the sand from this charming beach house. Perfect for families looking for a quiet getaway by the ocean.",
    type: "House",
    location: {
      city: "San Diego",
      country: "United States",
      address: "55 Ocean Blvd",
      lat: 32.7157,
      lng: -117.1611
    },
    price: 450,
    rating: 4.75,
    reviewsCount: 95,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wifi", "Kitchen", "Parking", "Beach access"],
    host: {
      id: "h5",
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSuperhost: false,
      rating: 4.6
    },
    reviews: [],
    maxGuests: 8,
    beds: 4,
    baths: 2
  }
];
