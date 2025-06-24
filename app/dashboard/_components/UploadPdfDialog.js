"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from 'convex/react';
import { Loader2Icon } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useUser } from "@clerk/clerk-react";
import uuid4 from 'uuid4';
import axios from 'axios';
import { toast } from 'sonner';


export function UploadPdfDialog({children, isMaxFile}) {
    
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const {user} = useUser();
  const [file,setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  }

  const OnUpload = async () => {

    if (!file) {
      toast.error("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await result.json();
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId });

      await addFileEntry({
        fileId,
        storageId,
        fileName: fileName ?? "Untitled File",
        fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const apiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
      await embeddDocument({
        splitText: apiResp.data.result,
        fileId,
      });

      toast.success("File is ready!");
      setOpen(false);
      setFile(null); // optional reset
      setFileName("");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          disabled={isMaxFile}
          className="w-full"
        >
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2>Select a file to upload</h2>
              <div className="flex mt-5 gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={OnFileSelect}
                />
              </div>
              <div className="mt-2">
                <label>File Name *</label>
                <Input
                  placeholder="File Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} disabled={loading}>
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}