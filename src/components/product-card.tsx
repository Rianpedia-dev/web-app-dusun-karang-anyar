import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/mock-data";
import { ShoppingCart, ArrowUpRight } from "lucide-react";


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produk/${product.id}`} className="group h-full flex">
      <Card className="flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 border-border/50 bg-card/50 backdrop-blur-sm w-full h-full relative group">
        {/* Image Section */}
        <div className="relative aspect-[5/4] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <span className="text-white text-xs font-medium flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              Lihat Detail <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          
          {product.imageUrl ? (
            <img
              src={product.imageUrl || undefined}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-muted-foreground/20" />
            </div>
          )}
          
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20">
            <Badge 
              className={`
                shadow-md border-none px-2 py-0.5 text-[8px] sm:px-3 sm:py-1 sm:text-[10px] uppercase tracking-wider font-bold
                ${product.category === "Pertanian" ? "bg-emerald-500 text-white" : 
                  product.category === "Peternakan" ? "bg-amber-500 text-white" : 
                  "bg-blue-500 text-white"}
              `}
            >
              {product.category}
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="p-3 sm:p-5 flex-1 flex flex-col space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-sm sm:text-lg leading-tight line-clamp-2 sm:line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
