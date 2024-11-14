import ProductCard from "@/components/custom/products/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllProductsQuery } from "@/redux/queries/productApi";
import { Button } from "@/components/ui/button";

export default function ProductList() {
  const { isLoading, isError, data, refetch } = useGetAllProductsQuery();

  if (!isLoading && (!data?.success || isError)) {
    return (
      <div className="h-full translate-y-[-50px] flex flex-col items-center justify-center gap-6">
        <div className="font-medium text-xl text-red-500 flex flex-col items-center">
          <div>Something went wrong!!!</div>
          <div>Please retry later</div>
        </div>
        <Button variant="default" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4 sm:justify-center md:justify-normal h-fit max-h-full overflow-y-auto">
      {isLoading
        ? Array(6)
            .fill(1)
            .map((_e, i) => (
              <Skeleton
                key={i}
                className="max-w-96 min-w-60 w-full h-[120px] rounded-xl"
              />
            ))
        : data?.products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
    </div>
  );
}
