"use client"
import { useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {

  const {user} = useUser();
  const createUser = useMutation(api.user.createUser);


  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      userName: user?.fullName
    });

    console.log(result);
  }
  return (
    <div>
      <h2>Welcome to PDFIntellect</h2>
      <Button>Click Me</Button>

      <UserButton/>
    </div>
  )
}
