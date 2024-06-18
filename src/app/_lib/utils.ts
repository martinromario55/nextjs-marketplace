import { notFound } from "next/navigation";
import prisma from "./db";

interface iAppProps {
  category: "newest" | "templates" | "uikits" | "icons";
}

export async function getData({ category }: iAppProps) {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icon",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Icons",
        link: "/products/icon",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "templates": {
      const data = await prisma.product.findMany({
        where: {
          category: "template",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Templates",
        data: data,
        link: "/products/template",
      };
    }
    case "uikits": {
      const data = await prisma.product.findMany({
        where: {
          category: "uikit",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Ui Kits",
        data: data,
        link: "/products/uikit",
      };
    }
    default: {
      return notFound();
    }
  }
}
