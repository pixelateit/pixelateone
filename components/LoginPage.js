"use client";

import Image from "next/image";
import LogoLongWoB from "@/public/logoLongWoB.svg";
import Google from "@/public/Google.svg";
import TBT from "@/public/tbt.png";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { trackClick } from "@/utils/analytics";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const rememberMe = e.target.rememberMe.checked;

    // 👉 Only applies to credentials login
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        rememberMe: rememberMe.toString(), // must be string
      });

      if (res?.error) {
        toast.error(res.error || "Invalid email or password");
      } else {
        toast.success("Welcome back 🎉");
        router.push("/admin");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <section
      className="w-full h-screen flex items-center justify-center bg-white relative"
      style={{
        backgroundImage: `url(${TBT.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-[412px] flex flex-col px-4 gap-3 pb-16">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col items-center gap-5">
            <Image
              src={LogoLongWoB}
              alt="Logo"
              height={32}
              className="h-8 aspect-auto"
            />
            <div className="w-full flex flex-col gap-1">
              <h1
                className="font-archivo font-bold text-xl text-white text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                Login
              </h1>
              <p
                className="font-archivo font-normal text-base text-[#828282] text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                Please Sign-In to your account
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-10 items-center">
            <div className="w-full flex flex-col gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-white font-archivo font-normal text-base text-[#242222] border border-[#BABFC3] focus:outline-none focus:ring-2 focus:ring-[#0095FF] transition-all duration-300 placeholder:text-[#5f5f5f]"
              />
              <div className="w-full relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-white font-archivo font-normal text-base text-[#242222] border border-[#BABFC3] focus:outline-none focus:ring-2 focus:ring-[#0095FF] transition-all duration-300 placeholder:text-[#5f5f5f]"
                />
              </div>
              <div className="w-full flex items-center">
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="bg-white w-5 h-5 rounded-sm border border-[#BABFC3]"
                  />
                  <span
                    className="font-archivo text-sm text-[#828282] font-normal"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Keep me logged in
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => trackClick("login_signin_button")}
              disabled={loading}
              className="w-full bg-[#FF3F2B] hover:bg-[#e72e19] transition-all duration-300 px-4 py-3 rounded-lg flex items-center justify-center cursor-pointer disabled:pointer-events-none disabled:bg-[#9b9b9b]"
            >
              <span
                className="font-archivo text-base text-white/80 font-semibold"
                style={{ letterSpacing: "-0.02em" }}
              >
                {loading ? "loading..." : "Sign In"}
              </span>
            </button>
          </div>
        </form>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full px-6 flex items-center gap-2.5">
            <div className="w-full h-[1px] bg-[#BABFC3]/80" />
            <span className="font-archivo text-sm text-[#5F5F5F] text-center font-medium">
              OR
            </span>
            <div className="w-full h-[1px] bg-[#BABFC3]/80" />
          </div>
          <button
            type="submit"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-[#282828] hover:bg-[#3e3e3e] transition-all duration-300 px-4 py-3 rounded-lg flex items-center gap-1 justify-center cursor-pointer disabled:pointer-events-none disabled:bg-[#9b9b9b]"
          >
            {" "}
            <Image src={Google} alt="Google" width={24} height={24} />
            <span
              className="font-archivo text-base text-white/80 font-semibold"
              style={{ letterSpacing: "-0.02em" }}
            >
              Sign In with Google
            </span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 text-center w-full">
        <span
          className="font-archivo text-xl text-white font-light uppercase"
          style={{ letterSpacing: "-0.04em" }}
        >
          TOMORROW<span className="font-bold">BEGINS</span>TODAY
        </span>
      </div>
    </section>
  );
}
