import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/models/product.model";

export default function ProductCard({
  name,
  category,
  price,
  updated_at,
}: Product) {
  return (
    <Card className="max-w-96 min-w-60 w-full h-fit">
      <CardContent className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl">{name}</div>
            <div className="text-sm text-csecondary">{category}</div>
          </div>
          <div className="text-2xl"> $ {price}</div>
        </div>
        {/* only for ADMIN */}
        <div className="w-full flex justify-between items-center">
          <div>
            <div className="text-xs text-csecondary">Last Updated at</div>
            <div className="text-xs">
              {new Date(updated_at).toLocaleString(undefined, {
                timeZone: "Asia/Kolkata",
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon">
              <Pencil />
            </Button>
            <Button variant="secondary" size="icon">
              <Trash2 />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
