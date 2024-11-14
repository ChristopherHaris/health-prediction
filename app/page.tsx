"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onClickQuickCheckup = () => {
    router.push("/quickcheckup");
  };

  const onClickFullCheckup = () => {
    router.push("/fullcheckup");
  };

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={() => onClickQuickCheckup()}>Quick Checkup</Button>
      <Button onClick={() => onClickFullCheckup()}>Full Checkup</Button>
    </div>
  );
}
