"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { trackContactClick } from "@/lib/actions/analytics";

interface WhatsAppButtonProps {
  product: any;
  className?: string;
}

export function WhatsAppButton({ product, className = "" }: WhatsAppButtonProps) {
  const handleContact = async () => {
    // Track the click
    await trackContactClick(product.id);
    
    // Format the phone number
    const phoneNumber = product.sellerContact;
    const message = `Halo ${product.sellerName}, saya melihat produk *${product.name}* di WebApp Marketplace Dusun Karang Anyar. Apakah produk ini masih tersedia?`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button 
      onClick={handleContact} 
      className={`w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex gap-2 items-center ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      Hubungi via WhatsApp
    </Button>
  );
}
