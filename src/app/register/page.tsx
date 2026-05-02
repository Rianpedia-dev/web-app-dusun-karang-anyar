import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout } from "lucide-react";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Sprout className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-2 text-3xl font-serif font-bold tracking-tight text-foreground">
            Daftar Sebagai Penjual
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Mulai pasarkan produk Anda ke jangkauan yang lebih luas.
          </p>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Buat Akun</CardTitle>
            <CardDescription>
              Lengkapi data berikut untuk mendaftar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Masuk di sini
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
