import { Card } from "@/components/ui/card";
import { SellForm } from "../_components/form/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const SellPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user === null || !user.id) {
    redirect("/api/auth/login");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
};

export default SellPage;
