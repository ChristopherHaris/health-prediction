"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DiabetesResults() {
  const router = useRouter();
  const [results, setResults] = useState({
    prediksi: "",
    risiko: "",
    saran: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil query parameter dari URL
    const query = new URLSearchParams(window.location.search);
    
    // Memastikan semua parameter ada
    const prediksi = query.get("prediksi") || "Hasil tidak ditemukan";
    const risiko = query.get("risiko") || "Tidak ada faktor risiko yang ditemukan.";
    const saran = query.get("saran") || "Tidak ada tindakan pencegahan yang ditemukan.";

    setResults({
      prediksi,
      risiko,
      saran,
    });

    setLoading(false);
  }, []);

  const handleGoBack = () => {
    // Menavigasi ulang ke halaman form
    router.push("/diabetes");
  };

  return (
    <div className="flex w-full py-20 px-4 justify-center">
      <Card className="w-full sm:w-[50%] mx-auto shadow-lg rounded-lg">
        {/* Card Header dengan background biru */}
        <CardHeader className="bg-blue-500 text-white rounded-t-lg py-4">
          <CardTitle className="text-lg font-semibold">Hasil Deteksi Diabetes</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center">
              <Loader2Icon className="animate-spin text-gray-500" size={48} />
            </div>
          ) : (
            <div>
              {/* Hasil Prediksi */}
              <h2 className="text-lg font-semibold">Prediksi Diabetes: {results.prediksi}</h2>
              <p className="text-sm text-gray-600">Faktor Risiko: {results.risiko}</p>

              {/* Saran */}
              <div>
                <h3 className="text-md font-medium mt-4">Saran:</h3>
                <p className="text-sm text-gray-600">{results.saran}</p>
              </div>
              
              {/* Tombol untuk kembali */}
              <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-3">
                Kembali
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
