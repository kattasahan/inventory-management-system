import Navbar from "@/components/custom/navbar";
import Router from "@/layout/Router";
import { Toaster } from "@/components/ui/toaster"

function Layout() {
  return (
    <div className="max-w-[1200px] w-full h-screen m-auto p-2">
      <Toaster />
      <Navbar />
      <div className="flex justify-center h-[90%]">
        <Router />
      </div>
    </div>
  );
}

export default Layout;
