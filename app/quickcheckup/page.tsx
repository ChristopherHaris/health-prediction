"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import axios from "axios";
import qs from "query-string";

const diseases = [
  {
    value: "itching",
    label: "Gatal",
  },
  {
    value: "skin rash",
    label: "Ruam Kulit",
  },
  {
    value: "nodal skin eruptions",
    label: "Benjolan Di Kulit",
  },
  {
    value: "continuous sneezing",
    label: "Bersin Terus-Menerus",
  },
  {
    value: "shivering",
    label: "Menggigil",
  },
  {
    value: "chills",
    label: "Merasa Dingin",
  },
  {
    value: "joint pain",
    label: "Nyeri Sendi",
  },
  {
    value: "stomach pain",
    label: "Perut Sakit",
  },
  {
    value: "acidity",
    label: "Asam Lambung",
  },
  {
    value: "ulcers on tongue",
    label: "Luka Di Lidah",
  },
  {
    value: "muscle wasting",
    label: "Otot Mengecil",
  },
  {
    value: "vomiting",
    label: "Mual-Mual",
  },
  {
    value: "burning micturition",
    label: "Nyeri Saat Buang Air Kecil",
  },
  {
    value: "spotting urination",
    label: "Bercak Saat Buang Air Kecil",
  },
  {
    value: "fatigue",
    label: "Kelelahan",
  },
  {
    value: "weight gain",
    label: "Penambahan Berat Badan",
  },
  {
    value: "anxiety",
    label: "Cemas",
  },
  {
    value: "cold hands and feet",
    label: "Tangan Dan Kaki Dingin",
  },
  {
    value: "mood swings",
    label: "Perubahan Suasana Hati",
  },
  {
    value: "weight loss",
    label: "Penurunan Berat Badan",
  },
  {
    value: "restlessness",
    label: "Gelisah",
  },
  {
    value: "lethargy",
    label: "Lesu",
  },
  {
    value: "patches in throat",
    label: "Bercak Di Tenggorokan",
  },
  {
    value: "irregular sugar level",
    label: "Kadar Gula Tidak Stabil",
  },
  {
    value: "cough",
    label: "Batuk",
  },
  {
    value: "high fever",
    label: "Demam Tinggi",
  },
  {
    value: "sunken eyes",
    label: "Mata Cekung",
  },
  {
    value: "breathlessness",
    label: "Sesak Napas",
  },
  {
    value: "sweating",
    label: "Keringat Berlebih",
  },
  {
    value: "dehydration",
    label: "Dehidrasi",
  },
  {
    value: "indigestion",
    label: "Susah Cerna",
  },
  {
    value: "headache",
    label: "Sakit Kepala",
  },
  {
    value: "yellowish skin",
    label: "Kulit Kekuningan",
  },
  {
    value: "dark urine",
    label: "Urine Gelap",
  },
  {
    value: "nausea",
    label: "Mual",
  },
  {
    value: "loss of appetite",
    label: "Hilang Nafsu Makan",
  },
  {
    value: "pain behind the eyes",
    label: "Nyeri Di Belakang Mata",
  },
  {
    value: "back pain",
    label: "Sakit Punggung",
  },
  {
    value: "constipation",
    label: "Susah Buang Air Besar",
  },
  {
    value: "abdominal pain",
    label: "Nyeri Perut",
  },
  {
    value: "diarrhoea",
    label: "Diare",
  },
  {
    value: "mild fever",
    label: "Demam Ringan",
  },
  {
    value: "yellow urine",
    label: "Urine Kekuningan",
  },
  {
    value: "yellowing of eyes",
    label: "Mata Kekuningan",
  },
  {
    value: "acute liver failure",
    label: "Gagal Hati Akut",
  },
  {
    value: "fluid overload",
    label: "Kelebihan Cairan",
  },
  {
    value: "swelling of stomach",
    label: "Perut Bengkak",
  },
  {
    value: "swelled lymph nodes",
    label: "Kelenjar Getah Bening Bengkak",
  },
  {
    value: "malaise",
    label: "Merasa Tidak Enak Badan",
  },
  {
    value: "blurred and distorted vision",
    label: "Penglihatan Buram",
  },
  {
    value: "phlegm",
    label: "Dahak",
  },
  {
    value: "throat irritation",
    label: "Iritasi Tenggorokan",
  },
  {
    value: "redness of eyes",
    label: "Mata Merah",
  },
  {
    value: "sinus pressure",
    label: "Tekanan Di Sinus",
  },
  {
    value: "runny nose",
    label: "Hidung Berair",
  },
  {
    value: "congestion",
    label: "Hidung Tersumbat",
  },
  {
    value: "chest pain",
    label: "Nyeri Dada",
  },
  {
    value: "weakness in limbs",
    label: "Lemah Di Anggota Tubuh",
  },
  {
    value: "fast heart rate",
    label: "Detak Jantung Cepat",
  },
  {
    value: "pain during bowel movements",
    label: "Nyeri Saat Buang Air Besar",
  },
  {
    value: "pain in anal region",
    label: "Nyeri Di Anus",
  },
  {
    value: "bloody stool",
    label: "Tinja Berdarah",
  },
  {
    value: "irritation in anus",
    label: "Iritasi Di Anus",
  },
  {
    value: "neck pain",
    label: "Sakit Leher",
  },
  {
    value: "dizziness",
    label: "Pusing",
  },
  {
    value: "cramps",
    label: "Kram",
  },
  {
    value: "bruising",
    label: "Memar",
  },
  {
    value: "obesity",
    label: "Kegemukan",
  },
  {
    value: "swollen legs",
    label: "Kaki Bengkak",
  },
  {
    value: "swollen blood vessels",
    label: "Pembuluh Darah Bengkak",
  },
  {
    value: "puffy face and eyes",
    label: "Wajah Dan Mata Bengkak",
  },
  {
    value: "enlarged thyroid",
    label: "Pembesaran Tiroid",
  },
  {
    value: "brittle nails",
    label: "Kuku Rapuh",
  },
  {
    value: "swollen extremities",
    label: "Bengkak Di Tangan Dan Kaki",
  },
  {
    value: "excessive hunger",
    label: "Rasa Lapar Berlebihan",
  },
  {
    value: "extra marital contacts",
    label: "Hubungan Di Luar Nikah",
  },
  {
    value: "drying and tingling lips",
    label: "Bibir Kering Dan Kesemutan",
  },
  {
    value: "slurred speech",
    label: "Bicara Pelo",
  },
  {
    value: "knee pain",
    label: "Nyeri Lutut",
  },
  {
    value: "hip joint pain",
    label: "Nyeri Sendi Pinggul",
  },
  {
    value: "muscle weakness",
    label: "Otot Lemah",
  },
  {
    value: "stiff neck",
    label: "Leher Kaku",
  },
  {
    value: "swelling joints",
    label: "Sendi Bengkak",
  },
  {
    value: "movement stiffness",
    label: "Gerakan Kaku",
  },
  {
    value: "spinning movements",
    label: "Merasa Berputar",
  },
  {
    value: "loss of balance",
    label: "Kehilangan Keseimbangan",
  },
  {
    value: "unsteadiness",
    label: "Ketidakstabilan Tubuh",
  },
  {
    value: "weakness of one body side",
    label: "Lemas Di Satu Sisi Tubuh",
  },
  {
    value: "loss of smell",
    label: "Hilangnya Penciuman",
  },
  {
    value: "bladder discomfort",
    label: "Tidak Nyaman Di Kandung Kemih",
  },
  {
    value: "foul smell of urine",
    label: "Bau Urine Menyengat",
  },
  {
    value: "continuous feel of urine",
    label: "Sering Merasa Ingin Buang Air Kecil",
  },
  {
    value: "passage of gases",
    label: "Sering Kentut",
  },
  {
    value: "internal itching",
    label: "Gatal Di Dalam",
  },
  {
    value: "toxic look (typhos)",
    label: "Tanda-Tanda Tifus",
  },
  {
    value: "depression",
    label: "Depresi",
  },
  {
    value: "irritability",
    label: "Mudah Marah",
  },
  {
    value: "muscle pain",
    label: "Nyeri Otot",
  },
  {
    value: "altered sensorium",
    label: "Perubahan Kesadaran",
  },
  {
    value: "red spots over body",
    label: "Bintik Merah Di Tubuh",
  },
  {
    value: "belly pain",
    label: "Sakit Perut",
  },
  {
    value: "abnormal menstruation",
    label: "Menstruasi Tidak Teratur",
  },
  {
    value: "dischromic patches",
    label: "Bercak Warna Pada Kulit",
  },
  {
    value: "watering from eyes",
    label: "Mata Berair",
  },
  {
    value: "increased appetite",
    label: "Nafsu Makan Meningkat",
  },
  {
    value: "polyuria",
    label: "Sering Buang Air Kecil",
  },
  {
    value: "family history",
    label: "Riwayat Penyakit Dalam Keluarga",
  },
  {
    value: "mucoid sputum",
    label: "Dahak Kental",
  },
  {
    value: "rusty sputum",
    label: "Dahak Kemerahan",
  },
  {
    value: "lack of concentration",
    label: "Sulit Konsentrasi",
  },
  {
    value: "visual disturbances",
    label: "Gangguan Penglihatan",
  },
  {
    value: "receiving blood transfusion",
    label: "Transfusi Darah",
  },
  {
    value: "receiving unsterile injections",
    label: "Suntikan Tidak Steril",
  },
  {
    value: "coma",
    label: "Koma",
  },
  {
    value: "stomach bleeding",
    label: "Pendarahan Di Lambung",
  },
  {
    value: "distention of abdomen",
    label: "Perut Kembung",
  },
  {
    value: "history of alcohol consumption",
    label: "Konsumsi Alkohol",
  },
  {
    value: "blood in sputum",
    label: "Darah Dalam Dahak",
  },
  {
    value: "prominent veins on calf",
    label: "Pembuluh Nadi Menonjol Di Betis",
  },
  {
    value: "palpitations",
    label: "Jantung Berdebar-Debar",
  },
  {
    value: "painful walking",
    label: "Nyeri Saat Berjalan",
  },
  {
    value: "pus filled pimples",
    label: "Jerawat Bernanah",
  },
  {
    value: "blackheads",
    label: "Komedo",
  },
  {
    value: "scarring",
    label: "Bekas Luka",
  },
  {
    value: "skin peeling",
    label: "Kulit Mengelupas",
  },
  {
    value: "silver like dusting",
    label: "Serpihan Berwarna Perak",
  },
  {
    value: "small dents in nails",
    label: "Lekukan Di Kuku",
  },
  {
    value: "inflammatory nails",
    label: "Peradangan Di Kuku",
  },
  {
    value: "blister",
    label: "Lepuh",
  },
  {
    value: "red sore around nose",
    label: "Luka Merah Di Sekitar Hidung",
  },
  {
    value: "yellow crust ooze",
    label: "Keluarnya Kerak Kuning",
  },
  {
    value: "prognosis",
    label: "Prognosis",
  },
];

const formSchema = z.object({
  Symptom_1: z.string().min(1, {
    message: "Symptom is required.",
  }),
  Symptom_2: z.string().min(1, {
    message: "Symptom is required.",
  }),
  Symptom_3: z.string().min(1, {
    message: "Symptom is required.",
  }),
  Symptom_4: z.string(),
});

export default function QuickCheckupPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [openFirst, setOpenFirst] = React.useState(false);
  const [valueFirst, setValueFirst] = React.useState("");
  const [openSecond, setOpenSecond] = React.useState(false);
  const [valueSecond, setValueSecond] = React.useState("");
  const [openThird, setOpenThird] = React.useState(false);
  const [valueThird, setValueThird] = React.useState("");
  const [openFourth, setOpenFourth] = React.useState(false);
  const [valueFourth, setValueFourth] = React.useState("");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Symptom_1: "",
      Symptom_2: "",
      Symptom_3: "",
      Symptom_4: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);

      const response = await axios.post(
        "http://localhost:5010/quick-checkup",
        values
      );

      if (response.status === 200) {
        toast.success("Success!");

        const resultData = {
          Disease: response.data.Disease,
          Description: response.data.Description,
          Precautions: response.data.Precautions,
        };

        const query = qs.stringify(resultData);

        form.reset();

        router.push(`/quickcheckupresult?${query}`);
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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Quick Checkup Form</CardTitle>
          <CardDescription>Add up to 4 of your symptoms.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="Symptom_1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover open={openFirst} onOpenChange={setOpenFirst}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openFirst}
                                className={cn(
                                  "w-full justify-between",
                                  valueFirst === "" ? "text-gray-500" : ""
                                )}
                              >
                                {valueFirst
                                  ? diseases.find(
                                      (disease) => disease.value === valueFirst
                                    )?.label
                                  : "Symptom 1"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2">
                              <Command>
                                <CommandInput placeholder="Select Symptom..." />
                                <CommandList>
                                  <CommandEmpty>No disease found.</CommandEmpty>
                                  <CommandGroup>
                                    {diseases.map((disease) => (
                                      <CommandItem
                                        key={disease.label}
                                        value={disease.value}
                                        onSelect={(currentValue) => {
                                          setValueFirst(
                                            currentValue === valueFirst
                                              ? ""
                                              : currentValue
                                          );
                                          setOpenFirst(false);
                                          field.onChange(currentValue);
                                        }}
                                      >
                                        {disease.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            valueFirst === disease.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Symptom_2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover
                            open={openSecond}
                            onOpenChange={setOpenSecond}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openSecond}
                                className={cn(
                                  "w-full justify-between",
                                  valueSecond === "" ? "text-gray-500" : ""
                                )}
                              >
                                {valueSecond
                                  ? diseases.find(
                                      (disease) => disease.value === valueSecond
                                    )?.label
                                  : "Symptom 2"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2">
                              <Command>
                                <CommandInput placeholder="Select disease..." />
                                <CommandList>
                                  <CommandEmpty>No disease found.</CommandEmpty>
                                  <CommandGroup>
                                    {diseases.map((disease) => (
                                      <CommandItem
                                        key={disease.value}
                                        value={disease.value}
                                        onSelect={(currentValue) => {
                                          setValueSecond(
                                            currentValue === valueSecond
                                              ? ""
                                              : currentValue
                                          );
                                          setOpenSecond(false);
                                          field.onChange(currentValue);
                                        }}
                                      >
                                        {disease.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            valueSecond === disease.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Symptom_3"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover open={openThird} onOpenChange={setOpenThird}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openThird}
                                className={cn(
                                  "w-full justify-between",
                                  valueThird === "" ? "text-gray-500" : ""
                                )}
                              >
                                {valueThird
                                  ? diseases.find(
                                      (disease) => disease.value === valueThird
                                    )?.label
                                  : "Symptom 3"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2">
                              <Command>
                                <CommandInput placeholder="Select disease..." />
                                <CommandList>
                                  <CommandEmpty>No disease found.</CommandEmpty>
                                  <CommandGroup>
                                    {diseases.map((disease) => (
                                      <CommandItem
                                        key={disease.value}
                                        value={disease.value}
                                        onSelect={(currentValue) => {
                                          setValueThird(
                                            currentValue === valueThird
                                              ? ""
                                              : currentValue
                                          );
                                          setOpenThird(false);
                                          field.onChange(currentValue);
                                        }}
                                      >
                                        {disease.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            valueThird === disease.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fourth Popover */}
                  <FormField
                    control={form.control}
                    name="Symptom_4"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover
                            open={openFourth}
                            onOpenChange={setOpenFourth}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openFourth}
                                className={cn(
                                  "w-full justify-between",
                                  valueFourth === "" ? "text-gray-500" : ""
                                )}
                              >
                                {valueFourth
                                  ? diseases.find(
                                      (disease) => disease.value === valueFourth
                                    )?.label
                                  : "Symptom 4"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-2">
                              <Command>
                                <CommandInput placeholder="Select disease..." />
                                <CommandList>
                                  <CommandEmpty>No disease found.</CommandEmpty>
                                  <CommandGroup>
                                    {diseases.map((disease) => (
                                      <CommandItem
                                        key={disease.value}
                                        value={disease.value}
                                        onSelect={(currentValue) => {
                                          setValueFourth(
                                            currentValue === valueFourth
                                              ? ""
                                              : currentValue
                                          );
                                          setOpenFourth(false);
                                          field.onChange(currentValue);
                                        }}
                                      >
                                        {disease.label}
                                        <Check
                                          className={cn(
                                            "ml-auto",
                                            valueFourth === disease.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <p className="text-xs ml-2 text-gray-500">
                          *this field is optional
                        </p>
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
