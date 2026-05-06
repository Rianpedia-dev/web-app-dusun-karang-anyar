export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  sellerId: string;
  sellerName: string;
  sellerLocation?: string | null;
  sellerContact?: string | null;
  views?: number;
  contactClicks?: number;
  isApproved: boolean;
  createdAt: string | Date;
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Beras Organik Karang Anyar",
    description: "Beras organik pilihan hasil panen langsung dari petani Karang Anyar. Ditanam tanpa pestisida kimia sehingga lebih sehat dan pulen.",
    price: 15000,
    category: "Pertanian",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600",
    sellerId: "u1",
    sellerName: "Pak Budi",
    sellerLocation: "RT 01 / RW 02, Karang Anyar",
    sellerContact: "6281234567890",
    views: 120,
    contactClicks: 5,
    isApproved: true,
    createdAt: "2023-10-01T10:00:00Z"
  },
  {
    id: "p2",
    name: "Susu Sapi Segar",
    description: "Susu sapi murni yang diperah pagi hari. Segar, tanpa bahan pengawet, dan sangat baik untuk kesehatan. Tersedia dalam kemasan 1 Liter.",
    price: 20000,
    category: "Peternakan",
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
    sellerId: "u2",
    sellerName: "Bu Siti (Peternakan Makmur)",
    sellerLocation: "RT 03 / RW 01, Karang Anyar",
    sellerContact: "6289876543210",
    views: 85,
    contactClicks: 12,
    isApproved: true,
    createdAt: "2023-10-02T08:30:00Z"
  },
  {
    id: "p3",
    name: "Telur Ayam Kampung Asli",
    description: "Telur ayam kampung berkualitas dari ayam yang diumbar bebas. Mengandung protein tinggi dan omega-3.",
    price: 35000,
    category: "Peternakan",
    imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&q=80&w=600",
    sellerId: "u1",
    sellerName: "Pak Budi",
    sellerLocation: "RT 01 / RW 02, Karang Anyar",
    sellerContact: "6281234567890",
    views: 200,
    contactClicks: 20,
    isApproved: true,
    createdAt: "2023-10-05T09:15:00Z"
  },
  {
    id: "p4",
    name: "Kopi Robusta Karang Anyar",
    description: "Biji kopi robusta pilihan yang dipetik dari perkebunan lereng Karang Anyar. Aroma kuat dan cita rasa khas.",
    price: 45000,
    category: "Olahan",
    imageUrl: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600",
    sellerId: "u3",
    sellerName: "Kang Herman",
    sellerLocation: "RT 02 / RW 02, Karang Anyar",
    sellerContact: "6281122334455",
    views: 150,
    contactClicks: 8,
    isApproved: true,
    createdAt: "2023-10-10T14:20:00Z"
  },
  {
    id: "p5",
    name: "Sayur Sawi Hijau Segar",
    description: "Sawi hijau segar, baru dipanen. Bebas ulat dan pestisida. Harga per ikat besar.",
    price: 5000,
    category: "Pertanian",
    imageUrl: "https://images.unsplash.com/photo-1598165682855-8cb5d5aeb990?auto=format&fit=crop&q=80&w=600",
    sellerId: "u4",
    sellerName: "Mbah Warni",
    sellerLocation: "RT 04 / RW 01, Karang Anyar",
    sellerContact: "6285566778899",
    views: 45,
    contactClicks: 2,
    isApproved: true,
    createdAt: "2023-10-15T07:00:00Z"
  },
  {
    id: "p6",
    name: "Madu Hutan Liar",
    description: "Madu asli dari lebah hutan liar di sekitar. Kaya manfaat dan terjamin keasliannya.",
    price: 85000,
    category: "Olahan",
    imageUrl: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=600",
    sellerId: "u2",
    sellerName: "Bu Siti (Peternakan Makmur)",
    sellerLocation: "RT 03 / RW 01, Karang Anyar",
    sellerContact: "6289876543210",
    views: 310,
    contactClicks: 45,
    isApproved: true,
    createdAt: "2023-10-18T11:45:00Z"
  }
];

export const MOCK_STATS = {
  totalProducts: 42,
  totalSellers: 15,
  totalViews: 1250,
  totalContacts: 320
};
