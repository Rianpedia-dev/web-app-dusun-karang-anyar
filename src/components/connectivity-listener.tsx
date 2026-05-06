"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wifi, WifiOff } from "lucide-react";

export function ConnectivityListener() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set status awal
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Kembali Online", {
        description: "Koneksi internet Anda telah pulih.",
        icon: <Wifi className="h-4 w-4" />,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Koneksi Terputus", {
        description: "Anda sedang offline. Beberapa fitur mungkin tidak berfungsi.",
        icon: <WifiOff className="h-4 w-4" />,
        duration: Infinity, // Tetap tampil sampai online kembali
      });
    };

    // Bersihkan toast offline sebelumnya jika kembali online
    if (isOnline) {
      toast.dismiss();
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return null; // Komponen ini hanya untuk listener
}
