import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Products from "@/pages/Products";
import Dashboard from "@/pages/Dashboard";

export default function Router() {
  const routes = [
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/products", element: <Products /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/notfound", element: <NotFound /> },
    // { path: "*", element: <Navigate to="/notfound" /> },
  ];
  return (
    <>
      <Routes>
        {...routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
}
