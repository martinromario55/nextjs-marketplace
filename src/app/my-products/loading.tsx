import { LoadingProductCard } from "../_components/ProductCard";

export default function LoadingFile() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="gird-cols-1 mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
