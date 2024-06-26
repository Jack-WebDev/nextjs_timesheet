import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";

type DashboardCardProps = {
  icon: IconType;
  total: number;
  title: string;
}

export default function DashboardCard({ icon: Icon, total, title }: DashboardCardProps) {
  return (
    <Card className=" border border-primary">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-4 text-white font-bold">
          <Icon fill="#d69436" fontSize="2rem" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="font-semibold">{total}</h2>
      </CardContent>
    </Card>
  );
}
