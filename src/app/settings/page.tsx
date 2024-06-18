import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SettingsForm } from "../_components/form/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "../_lib/db";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function SetttingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  const data = await getData(user.id);
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}
