"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FullCheckupResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Access query parameters from searchParams
  const diseaseDiabetes = searchParams.get("DiseaseDiabetes");
  const descriptionDiabetes = searchParams.get("DescriptionDiabetes");
  const riskFactorsDiabetes = searchParams.get("RiskFactorsDiabetes");
  const precautionsDiabetes = searchParams.getAll("PrecautionsDiabetes");

  const diseaseHeart = searchParams.get("DiseaseHeart");
  const descriptionHeart = searchParams.get("DescriptionHeart");
  const riskFactorsHeart = searchParams.get("RiskFactorsHeart");
  const precautionsHeart = searchParams.getAll("PrecautionsHeart");

  const diseaseStroke = searchParams.get("DiseaseStroke");
  const descriptionStroke = searchParams.get("DescriptionStroke");
  const riskFactorsStroke = searchParams.get("RiskFactorsStroke");
  const precautionsStroke = searchParams.getAll("PrecautionsStroke");

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex w-full py-20 justify-center">
      <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Checkup Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{diseaseDiabetes}</h2>
            <p className="text-gray-600">{descriptionDiabetes}</p>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Risk Factors :</h3>
              <p className=" text-gray-600">{riskFactorsDiabetes}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Precautions :</h3>
              <ul className="list-disc list-inside text-gray-600">
                {precautionsDiabetes?.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            <h2 className="text-lg font-semibold">{diseaseHeart}</h2>
            <p className="text-gray-600">{descriptionHeart}</p>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Risk Factors :</h3>
              <p className="text-gray-600">{riskFactorsHeart}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Precautions:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {precautionsHeart?.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4 my-4">
            <h2 className="text-lg font-semibold">{diseaseStroke}</h2>
            <p className="text-gray-600">{descriptionStroke}</p>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Risk Factors:</h3>
              <p className="text-gray-600">{riskFactorsStroke}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-md font-medium mt-4">Precautions:</h3>
              <ul className="list-disc list-inside text-gray-600">
                {precautionsStroke?.map((precaution, index) => (
                  <li key={index}>{precaution}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button onClick={() => handleBack()}>Back</Button>
        </CardContent>
      </Card>
    </div>
  );
}
