import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";

export default function WorkspaceHeader({ fileName }) {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={34} />
        <h1 className="text-lg font-semibold">PDFIntellect</h1>
      </div>
      <h2 className="font-bold">{fileName}</h2>
      <div className="flex gap-2 items-center">
        <Button>Save</Button>
        <UserButton />
      </div>
    </div>
  );
}
