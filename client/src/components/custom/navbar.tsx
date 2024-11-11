import { ModeToggle } from "@/components/mode-toggle";
import { Box, Package } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  // const routes = [{path:"/login"}]
  return (
    <>
      <div className="w-full flex items-center justify-between border-b-2 gap-4 pb-2">
        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            {/* <Box /> */}
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
