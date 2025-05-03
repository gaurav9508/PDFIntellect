import React from 'react'
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

export function UploadPdfDialog({children}) {
    

    return (
        <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF File</DialogTitle>
            <DialogDescription asChild>
                <div>
                    <h2>Select a file to upload</h2>
                    <div className='flex mt-5 gap-2 p-3 rounded-md border'>
                        
                        <input type="file" accept='application/pdf'/>
                    </div>
                    <div className='mt-2'>
                        <label>File Name *</label>
                        <Input placeholder="File Name"/>
                    </div>
                    <div>

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
          <Button>Upload</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>      
    )
}
