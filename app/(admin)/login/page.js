import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginPage from "@/components/LoginPage";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin");
  }

  return <LoginPage />;
}
