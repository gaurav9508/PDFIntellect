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

  // const checkUser = async () => {
  //   const result = await createUser({
  //     email: user?.primaryEmailAddress?.emailAddress,
  //     imageUrl: user?.imageUrl,
  //     userName: user?.fullName,
  //   });

  //   console.log(result);
  // };

  const checkUser = async () => {
    if (!user) return;

    const email =
      user.primaryEmailAddress?.emailAddress ||
      user.emailAddresses?.[0]?.emailAddress;
    const imageUrl = user.imageUrl || "";
    const userName = user.fullName || email;

    if (email) {
      const result = await createUser({
        email,
        imageUrl,
        userName,
      });

      console.log(result);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-6 py-4">
      <header className="flex justify-between items-center py-3 px-6 bg-white/60 backdrop-blur-md rounded-full border shadow-md max-w-5xl mx-auto mt-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={34} height={34} />
          <span className="font-bold text-lg text-gray-800">PDFIntellect</span>
        </div>

        <nav className="flex gap-10 text-sm text-gray-700 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-2">
          <a href="#">How It Works</a>
          <a href="#">Features</a>
          <a href="#">Who It's For</a>
          <a href="#">FAQ</a>
        </nav>

        <div className="flex items-center gap-5">
          <Button
            variant="outline"
            className="rounded-full border border-indigo-500 text-indigo-600 font-semibold px-7 py-2 hover:bg-indigo-50"
            onClick={() => router.push(user ? "/dashboard" : "/sign-in")}
          >
            Get Started
          </Button>
          {user && (
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
          )}
        </div>
      </header>

      <section className="text-center max-w-4xl mx-auto mt-24">
        <p className="text-blue-600 font-medium">Learn Smarter, Not Harder</p>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-4">
          Meet Your Personal <br />
          <span className="text-blue-600">PDF Assisstant</span>
        </h1>
        <p className="mt-6 text-gray-600 text-lg">
          Let AI handle your PDFs—extract key points, take notes, and study
          smarter.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Button
            onClick={handleGetStarted}
            className="px-6 py-3 text-lg bg-black text-white hover:scale-105 transition-transform"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-6 py-3 text-lg hover:scale-105 transition-transform"
          >
            Learn More
          </Button>
        </div>
      </section>
    </main>
  );
}
