import { ProductDescription } from "@/app/_components/ProductDescription";
import { BuyButton } from "@/app/_components/SubmitButtons";
import prisma from "@/app/_lib/db";
import { unstable_noStore as noStore } from "next/cache";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import { BuyProduct } from "@/app/actions";

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);
  return (
    <section className="mx-auto max-w-7xl px-4 lg:mt-10 lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 lg:px-8 xl:gap-x-16">
      <Carousel className="lg:col-span-4 lg:row-end-1">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item as string}
                  alt="product image"
                  fill
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="mx-auto mt-5 max-w-2xl lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>
        <form action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          <BuyButton price={data?.price as number} />
        </form>

        <div className="mt-10 border-t border-gray-200 pt-10">
          <div className="grid w-full grid-cols-2 gap-y-3">
            <h3 className="col-span-1 text-sm font-medium text-muted-foreground">
              Released:
            </h3>
            <h3 className="col-span-1 text-sm font-medium">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>

            <h3 className="col-span-1 text-sm font-medium text-muted-foreground">
              Category:
            </h3>

            <h3 className="col-span-1 text-sm font-medium">{data?.category}</h3>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200"></div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </section>
  );
}
