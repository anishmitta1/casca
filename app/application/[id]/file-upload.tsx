"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleX } from "lucide-react";
import { useState } from "react";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
};

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const onUploadFiles = (uploadedFiles: File[]) => setFile(uploadedFiles[0]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onUploadFiles,
    accept: {
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  if (!file) {
    return (
      <div>
        <div className="border border-gray-200 border-2 border-dashed rounded-xl p-4 py-[56px] flex items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col gap-2 text-center">
              <div className="text-xl font-semibold">
                Upload Business Bank Statements
              </div>
              <div className="text-md">
                Drag and drop your business bank statements here, or browse
                files.
              </div>
            </div>
            <Button {...getRootProps()} className="rounded-full">
              <input {...getInputProps()} />
              Upload files
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 py-2">
        <div className="py-2 rounded-lg bg-card font-semibold">{file.name}</div>

        <Badge variant="outline">{formatFileSize(file.size)}</Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button
          className="flex items-center gap-2"
          variant="outline"
          onClick={() => setFile(null)}
        >
          Choose another file
          <CircleX className="w-4 h-4" />
        </Button>

        <Button className="flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
