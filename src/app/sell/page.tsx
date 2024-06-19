import { Card } from "@/components/ui/card";
import { SellForm } from "../_components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../_lib/db";

// If Stripe not activated, redirect user to /billing
async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
}

const SellPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default SellPage;
