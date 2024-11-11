import ProductList from "@/components/custom/products/product-list";
import ProductsHeader from "@/components/custom/products/products-header";

export default function Products() {
  return (
    <div className="h-full w-full py-8 px-2">
      <ProductsHeader />
      <ProductList />
    </div>
  );
}
