"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Heart,
  Hospital,
  Activity,
  Syringe,
  Shield,
  Users,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const onClickQuickCheckup = () => {
    router.push("/quickcheckup");
  };

  const onClickFullCheckup = () => {
    router.push("/fullcheckup");
  };

  useEffect(() => {
    const disclaimerShown = localStorage.getItem("disclaimerShown");
    if (!disclaimerShown) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem("disclaimerShown", "true"); // Mark disclaimer as shown
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="space-y-4">
            <DialogTitle className="font-bold text-xl my-2">Syarat Penggunaan dan Disclaimer</DialogTitle>
            <DialogDescription>
              MediScope adalah alat bantu prediksi kesehatan berbasis data.
              Hasil prediksi hanya untuk referensi awal, bukan sebagai diagnosis
              medis resmi.
            </DialogDescription>
            <DialogDescription>
              Kami tidak bertanggung jawab atas segala kerugian yang timbul dari
              penggunaan aplikasi ini. Untuk diagnosis dan pengobatan yang
              akurat, konsultasikan hasilnya dengan tenaga medis profesional.
            </DialogDescription>
            <DialogDescription>
              Jika Anda tenaga medis profesional, gunakan aplikasi ini hanya
              sebagai acuan atau diagnosa awal. Dengan melanjutkan, Anda setuju
              untuk memahami dan menerima syarat ini.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseDisclaimer}>Setuju</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <header className="border-b">
        <div className=" flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <span className="text-xl font-bold">
                Medi<span className="text-blue-500">Scope</span>
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Layanan Kami
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Digital Checkup
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Mental Health
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
              >
                Booking Janji
              </Link>
            </nav>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Login/Register
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-24 light:bg-gradient-to-b from-blue-50 to-white">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_800px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl xl:text-3xl/none">
                    Pantau resiko kesehatan anda!
                  </h1>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Medi<span className="text-blue-500">Scope</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Solusi paling jelas ada kesehatan yang anda perlukan.
                  </p>
                </div>
                <div className="flex flex-col gap-6 min-[400px]:flex-row">
                  <Button onClick={onClickQuickCheckup}>Quick Checkup</Button>
                  <Button onClick={onClickFullCheckup}>Full Checkup</Button>
                </div>
              </div>
              <Image
                alt="Medical Professionals"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-contain object-center"
                height="600"
                src="https://utfs.io/f/d8MjW7okoChM3nEntrbHmagBclPf5iVxyuFOTWKZ6YXDR1SG"
                width="800"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">
              Atau, Pilih Penyakit Yang Ingin Anda Periksa
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  <Card className="p-4 flex flex-col items-center gap-2">
    <Building2 className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Penyakit Jantung</span>
  </Card>
  <Card
    className="p-4 flex flex-col items-center gap-2 cursor-pointer"
    onClick={() => router.push("/diabetes")}
  >
    <Heart className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Diabetes</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <Hospital className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Paru</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <Activity className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Tekanan Darah</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <Syringe className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Alergi</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <Shield className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Tuberculosis</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <Users className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Hepatitis</span>
  </Card>
  <Card className="p-4 flex flex-col items-center gap-2">
    <TrendingUp className="h-8 w-8 text-blue-500" />
    <span className="text-sm font-medium">Arthritis</span>
  </Card>
</div>

          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 light:bg-gray-50">
          <div className=" px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="max-w-[800px] mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Apa Itu MediScope?</AccordionTrigger>
                  <AccordionContent>
                    MediScope adalah aplikasi prediksi kesehatan berbasis data
                    yang memberikan estimasi potensi kondisi kesehatan pengguna
                    berdasarkan data yang dimasukkan, seperti tekanan darah,
                    kadar glukosa, dan gejala lainnya.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Apakah hasil MediScope dapat digunakan sebagai diagnosis
                    medis?
                  </AccordionTrigger>
                  <AccordionContent>
                    Tidak. Hasil MediScope hanya sebagai referensi awal dan
                    bukan diagnosis medis resmi. Selalu konsultasikan dengan
                    tenaga medis profesional untuk diagnosis yang akurat.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Data apa saja yang diperlukan untuk membuat prediksi?
                  </AccordionTrigger>
                  <AccordionContent>
                    MediScope membutuhkan data dasar seperti usia, jenis
                    kelamin, BMI, tekanan darah, kadar glukosa, riwayat
                    kesehatan, dan gejala yang dialami untuk melakukan prediksi
                    awal.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Apakah data pengguna disimpan di server?
                  </AccordionTrigger>
                  <AccordionContent>
                    Tidak, semua data hanya diproses untuk analisis sementara
                    dan tidak disimpan dalam server kami, menjaga privasi dan
                    keamanan informasi pengguna.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Apakah MediScope menjamin hasil yang akurat?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hasil yang diberikan MediScope adalah prediksi berbasis data
                    dan bukan jaminan diagnosis. Untuk penanganan lebih lanjut
                    dan pengobatan, konsultasikan hasil dengan dokter.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Bagaimana cara menggunakan MediScope?
                  </AccordionTrigger>
                  <AccordionContent>
                    Masukkan informasi yang diminta pada kolom-kolom yang
                    tersedia, pilih kondisi kesehatan yang ingin diperiksa, dan
                    klik untuk mendapatkan hasil prediksi.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-[#1a237e] text-white">
        <div className=" flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:gap-6 md:py-8">
          <div className="flex-1">
            <div className="text-lg font-semibold">MediScope</div>
            <div className="text-sm">
              Jl. Lorem/No.1-5, Jl.Ring Area, Kec. Palembang, Jkt
            </div>
            <div className="text-sm">West Jakarta (Barat) 14045</div>
            <div className="text-sm">+62 878 787 8787</div>
          </div>
          <div className="flex gap-4">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Facebook
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Twitter
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              Instagram
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="#"
            >
              LinkedIn
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className=" flex flex-col gap-4 px-4 py-6 text-sm md:flex-row md:items-center md:gap-6 md:py-4">
            <div className="text-center md:text-left">
              Copyright ©2024 MediScope. All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
