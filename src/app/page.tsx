import { NewestProducts } from "./_components/NewestProducts";

const page = () => {
  return (
    <section className="mx-auto mb-24 max-w-7xl px-4 md:px-8">
      <div className="mx-auto max-w-3xl text-center text-2xl font-semibold sm:text-5xl lg:text-6xl">
        <h1>Find the best Tailwind</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="mx-auto mt-5 w-[90%] text-base font-normal text-muted-foreground lg:text-lg">
          MarshalUi stands out as the premier marketplace for all things related
          to tailwindcss, offering an unparalleled platform for both sellers and
          buyers alike.
        </p>
      </div>
      <NewestProducts />
      {/* <ProductRow category="newest" />
      <ProductRow category="templates" />
      <ProductRow category="icons" />
      <ProductRow category="uikits" /> */}
    </section>
  );
};

export default page;
