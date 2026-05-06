import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 mb-4 overflow-hidden rounded-full border-2 border-primary/20 shadow-2xl bg-background p-1.5">
            <Image 
              src="/favicon.ico" 
              alt="Logo Karang Anyar" 
              fill
              className="object-contain"
            />
          </div>
          <h2 className="mt-2 text-3xl font-serif font-bold tracking-tight text-foreground">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Masuk ke akun Anda untuk mengelola produk.
          </p>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Masuk</CardTitle>
            <CardDescription>
              Gunakan email dan kata sandi Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>

        </Card>
      </div>
    </div>
  );
}
