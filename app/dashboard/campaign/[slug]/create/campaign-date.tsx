"use client";
import { useParams, usePathname } from "next/navigation";

function CampaignDate() {
  const pathname = usePathname();
  const params = useParams<{ slug: string }>();
  // const [date, setDate] = useState<DateRange | undefined>({
  return <div className="h-2 border">{params.slug}</div>;
}

export { CampaignDate };
