import { createClient } from "./client";

export async function uploadProductImage(file: File) {
  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `product-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteProductImage(imageUrl: string) {
  if (!imageUrl || !imageUrl.includes('product-images/')) return;

  try {
    const supabase = createClient();
    
    // Extract the path after 'product-images/'
    // Example URL: https://.../storage/v1/object/public/products/product-images/abc.jpg
    const parts = imageUrl.split('product-images/');
    if (parts.length < 2) return;
    
    const filePath = `product-images/${parts[1]}`;

    const { error } = await supabase.storage
      .from('products')
      .remove([filePath]);

    if (error) {
      console.error("Error deleting image from storage:", error);
    }
  } catch (err) {
    console.error("Error in deleteProductImage:", err);
  }
}
