import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsHeader() {
  const role = "ADMIN";
  return (
    <div
      className={`flex ${
        role === "ADMIN" ? "justify-between" : ""
      } items-center`}
    >
      <div className="text-2xl">Products</div>
      {role === "ADMIN" && (
        <Button variant="secondary">
          <Plus />
          Add
        </Button>
      )}
    </div>
  );
}
