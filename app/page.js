"use client";
import { startTransition, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  const router = useRouter();

  const handleGetStarted = () => {
    const id = toast.loading("Redirecting...");

    if (!user) {
      router.push("/sign-in");
    } else {
      router.push("/dashboard");
    }

    // Automatically dismiss after short delay
    setTimeout(() => toast.dismiss(id), 1500);
  };

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName,
    });

    console.log(result);
  };
  return (
    // <main className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-6">
    <main className="min-h-screen bg-white/60 backdrop-blur-md p-6">
      <header className="flex justify-between items-center py-4">
        <div>
          <Image src="/logo.svg" alt="Logo" width={40} height={34} />
        </div>
        <div className="flex gap-4 items-center pr-6">
          <Button
            className="hover:scale-105 transition-transform duration-200"
            onClick={() => router.push(user ? "/dashboard" : "/sign-in")}
          >
            Get Started
          </Button>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: {
                  width: "34px",
                  height: "34px",
                },
              },
            }}
          />
        </div>
      </header>

      <section className="text-center mt-20">
        <h1 className="text-5xl font-bold leading-tight">
          Simplify <span className="text-red-500">PDF</span>{" "}
          <span className="text-blue-500">Note-Taking</span> with AI-Powered
        </h1>
        <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
          Elevate your note-taking experience with our AI-powered PDF app.
          Seamlessly extract key insights, summaries, and annotations from any
          PDF with just a few clicks.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Button
            onClick={handleGetStarted}
            className="px-6 py-3 text-lg bg-black text-white transition-transform duration-300 transform hover:scale-110 cursor-pointer"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg transition-transform duration-300 transform hover:scale-110 cursor-pointer"
          >
            Learn More
          </Button>
        </div>
      </section>
    </main>
  );
}
