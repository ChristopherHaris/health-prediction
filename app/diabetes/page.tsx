"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Validasi form menggunakan Zod
const formSchema = z.object({
  glucose: z
    .number()
    .min(0.1, "Glukosa harus lebih besar dari 0")
    .max(500, "Glukosa tidak boleh lebih dari 500")
    .refine((val) => !isNaN(val), {
      message: "Glukosa harus berupa angka",
    }),
  bloodPressure: z
    .number()
    .min(0.1, "Tekanan darah harus lebih besar dari 0")
    .max(300, "Tekanan darah tidak boleh lebih dari 300")
    .refine((val) => !isNaN(val), {
      message: "Tekanan darah harus berupa angka",
    }),
  bmi: z
    .number()
    .min(0.1, "BMI harus lebih besar dari 0")
    .max(100, "BMI tidak boleh lebih dari 100")
    .refine((val) => !isNaN(val), {
      message: "BMI harus berupa angka",
    }),
  age: z
    .number()
    .min(1, "Usia harus lebih besar dari 0")
    .max(120, "Usia tidak boleh lebih dari 120")
    .refine((val) => !isNaN(val), {
      message: "Usia harus berupa angka",
    }),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "Anda harus menyetujui syarat dan ketentuan.",
  }),
});

export default function DiabetesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      glucose: undefined, // Menggunakan undefined agar placeholder muncul
      bloodPressure: undefined,
      bmi: undefined,
      age: undefined,
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
  
    const formData = {
      glucose: values.glucose,
      bloodpressure: values.bloodPressure,
      bmi: values.bmi,
      age: values.age,
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:5003/fc-diabetes", formData);
  
      const resultData = response.data || {};
  
      // Redirect dengan query parameter dari API response
      const query = new URLSearchParams({
        prediksi: resultData.prediksi_diabetes || "Hasil tidak ditemukan",
        risiko: resultData.faktor_risiko_diabetes || "Tidak ada faktor risiko yang ditemukan.",
        saran: resultData.saran_diabetes || "Tidak ada tindakan pencegahan yang ditemukan.",
      }).toString();
  
      router.push(`/diabetesresults?${query}`);
      toast.success("Data berhasil dikirim!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Terjadi kesalahan, coba lagi.");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex justify-center py-20">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Deteksi Diabetes</CardTitle>
          <CardDescription>
            Masukkan data berikut untuk memeriksa kemungkinan diabetes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                {/* Input untuk Glukosa */}
                <FormField
                  control={form.control}
                  name="glucose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Glukosa (mg/dL)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Masukkan nilai glukosa"
                          {...field}
                          onFocus={(e) => e.target.select()}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input untuk Tekanan Darah */}
                <FormField
                  control={form.control}
                  name="bloodPressure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tekanan Darah (mm Hg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Masukkan nilai tekanan darah"
                          {...field}
                          onFocus={(e) => e.target.select()}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input untuk BMI */}
                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Indeks Massa Tubuh (BMI)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Masukkan nilai BMI"
                          {...field}
                          onFocus={(e) => e.target.select()}
                          onBlur={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Input untuk Usia */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usia (Tahun)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Masukkan usia"
                          {...field}
                          onFocus={(e) => e.target.select()}
                          onBlur={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value)) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Checkbox untuk Setuju Syarat dan Ketentuan */}
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <FormLabel>Saya setuju dengan syarat dan ketentuan</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tombol Submit */}
              <div className="mt-6 flex justify-center">
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2Icon className="animate-spin" /> : "Periksa Diabetes"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
