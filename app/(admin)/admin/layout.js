import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminHeader from "@/components/AdminHeader";
import AdminSideMenu from "@/components/AdminSideMenu";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // not logged in → send to login
  }

  return (
    <div className="w-full min-h-screen relative">
      <AdminHeader />
      <div className="w-full h-full flex flex-col-reverse md:flex-row relative">
        <AdminSideMenu />
        <div className="w-full pt-16  px-5">{children}</div>
      </div>
    </div>
  );
}
