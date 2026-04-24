import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/mock-data";

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produk/${product.id}`} className="group h-full flex">
      <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 w-full h-full">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge 
              variant={product.category === "Pertanian" ? "default" : product.category === "Peternakan" ? "secondary" : "outline"}
              className="shadow-sm"
            >
              {product.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>
          <div className="mt-auto">
            <p className="font-bold text-primary text-lg">
              {formatRupiah(product.price)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between items-center">
          <span className="truncate max-w-[120px]">{product.sellerName}</span>
          <span className="truncate max-w-[100px]">{product.sellerLocation}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
