import { ProductCard } from "@/app/_components/ProductCard";
import prisma from "@/app/_lib/db";
import { type CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(category: string) {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  noStore();
  const data = await getData(params.category);
  return (
    <>
      {data.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8">
          <p>No product found</p>{" "}
        </section>
      )}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mt-4 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <ProductCard
              key={product.id}
              images={product.images}
              price={product.price}
              name={product.name}
              id={product.id}
              smallDescription={product.smallDescription}
            />
          ))}
        </div>
      </section>
    </>
  );
}
