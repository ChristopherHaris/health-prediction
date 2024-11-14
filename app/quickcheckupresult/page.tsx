"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickCheckupResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const disease = searchParams.get("Disease");
  const description = searchParams.get("Description");
  const precautions = searchParams.getAll("Precautions");

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full py-20 justify-center ">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Checkup Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Disease: {disease}</h2>
            <p className="text-sm text-gray-600">Description: {description}</p>
            <div>
              <h3 className="text-md font-medium mt-4">Precautions:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {precautions?.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button className="mt-4" onClick={() => handleBack()}>Back</Button>
        </CardContent>
      </Card>
    </div>
  );
}
