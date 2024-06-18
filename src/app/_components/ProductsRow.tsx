import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "../_lib/utils";

interface iAppProps {
  category: "newest" | "templates" | "uikits" | "icons";
}

export function ProductRow({ category }: iAppProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="hidden text-sm font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="gird-cols-1 mt-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
