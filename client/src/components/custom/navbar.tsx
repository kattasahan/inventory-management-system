import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <>
      <div className="w-full flex items-center justify-between border gap-4 py-2 px-6 shadow-md rounded-[50rem]">
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <Package />
            IMS
          </div>
          <div className="flex gap-4">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Products</Link>
          </div>
        </div>
        <ModeToggle />
      </div>
    </>
  );
}

export default Navbar;
