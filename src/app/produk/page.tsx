import { getProducts } from "@/lib/actions/product";
import { ProductCard } from "@/components/product-card";
import { SearchBar } from "@/components/search-bar";
import { CategoryFilter } from "@/components/category-filter";

interface ProdukKatalogProps {
  searchParams: Promise<{ 
    search?: string; 
    category?: string;
  }>;
}

export default async function ProdukKatalog({ searchParams }: ProdukKatalogProps) {
  const { search, category } = await searchParams;

  const products = await getProducts({
    search: search,
    category: category === "Semua" ? undefined : category,
    approvedOnly: true
  });

  // Get unique categories for filter (hardcoded for now as per schema logic or derived)
  const categories = ["Pertanian", "Peternakan", "Olahan"];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Katalog Produk</h1>
          <p className="text-muted-foreground">Temukan berbagai hasil bumi dan peternakan Karang Anyar.</p>
        </div>
        
        <div className="w-full md:w-72">
          {/* Note: SearchBar needs to be a Client Component that updates URL */}
          <SearchBar defaultValue={search} />
        </div>
      </div>

      <div className="mb-8">
        {/* Note: CategoryFilter needs to be a Client Component that updates URL */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={category || "Semua"} 
        />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed">
          <h3 className="text-xl font-bold mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-muted-foreground">
            Coba ubah kata kunci pencarian atau pilih kategori lain.
          </p>
        </div>
      )}
    </div>
  );
}
