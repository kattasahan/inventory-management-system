import { useEffect } from "react";
import ProductCard from "@/components/custom/products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts, ProductState } from "@/redux/productSlicer";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products: ProductState = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    
    return () => {};
  }, []);

  if (products.error) {
    return <>{JSON.stringify(JSON.parse(products.error))}</>;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 sm:justify-center md:justify-normal h-fit max-h-full overflow-y-auto">
      {products.isLoading
        ? Array(6)
            .fill(1)
            .map((_e, i) => (
              <Skeleton
                key={i}
                className="max-w-96 min-w-60 w-full h-[120px] rounded-xl"
              />
            ))
        : products?.data?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
    </div>
  );
}
