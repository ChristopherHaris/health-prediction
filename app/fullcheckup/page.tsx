"use client";

import * as React from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import qs from "query-string";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  age: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Age must be a positive integer.",
    })
    .optional(),
  maritalstatus: z.string().min(1, {
    message: "Marital status is required.",
  }),
  sex: z.coerce.number().int({
    message: "Sex is required.",
  }),
  bmi: z.coerce
    .number()
    .min(0)
    .max(100, {
      message: "BMI should be between 0 and 100.",
    })
    .optional(),
  bloodpressure: z.coerce
    .number()
    .int()
    .min(0)
    .max(300, {
      message: "Blood pressure should be between 0 and 300.",
    })
    .optional(),
  glucose: z.coerce
    .number()
    .min(0, {
      message: "Glucose level should be a positive number.",
    })
    .optional(),
  smoke: z.string().min(1, {
    message: "Smoking status is required.",
  }),
  worktype: z.string().min(1, {
    message: "Work type is required.",
  }),
  residence: z.string().min(1, {
    message: "Residence is required.",
  }),
  hypertension: z.boolean(),
  heartdisease: z.boolean(),
  cp: z.coerce.number().int({
    message: "Chest pain type is required.",
  }),
  chol: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Cholesterol level is required.",
    })
    .optional(),
  fbs: z.boolean(),
  restecg: z.coerce.number().int().min(0, {
    message: "Resting electrocardiogram is required.",
  }),
  thalach: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Maximum heart rate achieved is required.",
    })
    .optional(),
  exang: z.boolean(),
  oldpeak: z.coerce
    .number()
    .min(0, {
      message: "ST depression induced by exercise is required.",
    })
    .optional(),
  slope: z.coerce.number().int().min(0, {
    message: "The slope of the peak exercise ST segment is required.",
  }),
  ca: z.coerce.number().int().min(0, {
    message: "Number of major vessels colored by fluoroscopy is required.",
  }),
  thal: z.coerce.number().int().min(0, {
    message: "Thalassemia status is required.",
  }),
});

export default function FullCheckupPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      maritalstatus: "",
      sex: 0,
      bmi: undefined,
      bloodpressure: undefined,
      glucose: undefined,
      smoke: "",
      worktype: "",
      residence: "",
      hypertension: false,
      heartdisease: false,
      cp: 0,
      chol: undefined,
      fbs: false,
      restecg: 0,
      thalach: undefined,
      exang: false,
      oldpeak: undefined,
      slope: 0,
      ca: 0,
      thal: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const processedValues = {
        ...values,
        hypertension: values.hypertension ? "hyten" : "nohypten",
        heartdisease: values.heartdisease ? "heartdis" : "noheartdis",
        fbs: values.fbs ? 1 : 0,
        exang: values.exang ? 1 : 0,
      };

      setIsLoading(true);
      console.log(processedValues);

      const response = await axios.post(
        "http://localhost:5000/full-checkup",
        processedValues
      );

      if (response.status === 200) {
        toast.success("Success!");

        const diabetes = Object.keys(response.data.results)[0];
        const diseaseDataDiabetes = response.data.results[diabetes];
        const heart = Object.keys(response.data.results)[1];
        const diseaseDataHeart = response.data.results[heart];
        const stroke = Object.keys(response.data.results)[2];
        const diseaseDataStroke = response.data.results[stroke];

        const resultData = {
          DiseaseDiabetes: diabetes,
          DescriptionDiabetes: diseaseDataDiabetes.Prediksi,
          RiskFactorsDiabetes: diseaseDataDiabetes["Faktor Risiko"],
          PrecautionsDiabetes: diseaseDataDiabetes.Saran,
          DiseaseHeart: heart,
          DescriptionHeart: diseaseDataHeart.Prediksi,
          RiskFactorsHeart: diseaseDataHeart["Faktor Risiko"],
          PrecautionsHeart: diseaseDataHeart.Saran,
          DiseaseStroke: stroke,
          DescriptionStroke: diseaseDataStroke.Prediksi,
          RiskFactorsStroke: diseaseDataStroke["Faktor Risiko"],
          PrecautionsStroke: diseaseDataStroke.Saran,
        };

        const query = qs.stringify(resultData, { encode: false });

        form.reset();

        router.push(`/fullcheckupresult?${query}`);

        toast.success("success");
      } else {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex w-full py-20 justify-center">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Full Checkup Form</CardTitle>
          <CardDescription>Add your full medical history.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Nama"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Umur</FormLabel>
                        <FormControl>
                          <Input
                            id="age"
                            type="number"
                            placeholder="Umur"
                            min={1}
                            max={150}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="1">Laki - Laki</SelectItem>
                                <SelectItem value="0">Perempuan</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maritalstatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Menikah</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Status Menikah" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="yes">
                                  Pernah Menikah
                                </SelectItem>
                                <SelectItem value="no">
                                  Tidak Pernah Menikah
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bmi"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BMI</FormLabel>
                        <FormControl>
                          <Input
                            id="bmi"
                            type="number"
                            placeholder="BMI (Body Mass Index)"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="smoke"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Merokok</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Status Merokok" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="formerly_smoked">
                                  Pernah Merokok
                                </SelectItem>
                                <SelectItem value="non_smoker">
                                  Tidak Pernah Merokok
                                </SelectItem>
                                <SelectItem value="smoker">Merokok</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="worktype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Pekerjaan</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Jenis Pekerjaan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="nojob">
                                  Belum Bekerja
                                </SelectItem>
                                <SelectItem value="age">
                                  Dibawah Umur
                                </SelectItem>
                                <SelectItem value="govtemp">
                                  Pegawai Negeri Sipil
                                </SelectItem>
                                <SelectItem value="privatejob">
                                  Pegawai Swasta
                                </SelectItem>
                                <SelectItem value="selfemp">
                                  Freelancing
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="residence"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat Tinggal</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Tempat Tinggal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="rural">Pedesaan</SelectItem>
                                <SelectItem value="urban">Perkotaan</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bloodpressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tekanan Darah</FormLabel>
                        <FormControl>
                          <Input
                            id="bloodpressure"
                            type="number"
                            placeholder="Tekanan Darah (mmHg)"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="glucose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gula Darah</FormLabel>
                        <FormControl>
                          <Input
                            id="glucose"
                            type="number"
                            placeholder="Nilai Gula Darah"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hypertension"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5 my-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Hipertensi</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heartdisease"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5 my-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Penyakit Jantung</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe Nyeri Dada</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Tipe Nyeri Dada" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="0">
                                  Tidak Ada Nyeri Dada
                                </SelectItem>
                                <SelectItem value="1">Angina Stabil</SelectItem>
                                <SelectItem value="2">
                                  Angina Non-Stabil
                                </SelectItem>
                                <SelectItem value="3">
                                  Nyeri Dada Atipikal
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="chol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kolesterol</FormLabel>
                        <FormControl>
                          <Input
                            id="kolesterol"
                            type="number"
                            placeholder="Kolesterol (mg/dL)"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fbs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5 my-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Kadar Gula Darah Puasa</FormLabel>
                          <FormDescription>&gt; 120 mg/dL</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restecg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test EKG</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Tipe Nyeri Dada" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="0">Normal</SelectItem>
                                <SelectItem value="1">Abnormal</SelectItem>
                                <SelectItem value="2">
                                  Tekanan Darah Tinggi
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thalach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detak Jantung Maksimal</FormLabel>
                        <FormControl>
                          <Input
                            id="thalach"
                            type="number"
                            placeholder="Detak Jantung Maksimal (BPM)"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="exang"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5 my-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Angina yang Diinduksi oleh Olahraga
                          </FormLabel>
                          <FormDescription>
                            Terdapat Nyeri Dada saat Olahraga
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="oldpeak"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Depresi ST</FormLabel>
                        <FormControl>
                          <Input
                            id="tekanan_darah"
                            type="number"
                            placeholder="Tingkat depresi segmen ST selama olahraga"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slope"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kemiringan Segmen ST saat Olahraga
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Kemiringan Segmen ST saat Olahraga" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="1">Upsloping</SelectItem>
                                <SelectItem value="2">Flat</SelectItem>
                                <SelectItem value="3">Downsloping</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ca"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Pembuluh Besar</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Jumlah Pembuluh Besar" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="0">
                                  Tidak Ada Penyumbatan
                                </SelectItem>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thalassemia</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "w-full",
                                field.value ? "" : "text-gray-500"
                              )}
                            >
                              <SelectValue placeholder="Thalassemia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="3">Normal</SelectItem>
                                <SelectItem value="6">Defect Tetap</SelectItem>
                                <SelectItem value="7">
                                  Defect Reversible
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <Button onClick={onCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button disabled={isLoading} type="submit">
                    {isLoading && (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Check
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
