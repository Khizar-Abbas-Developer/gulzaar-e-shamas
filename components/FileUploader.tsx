"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { FileUploaderProps } from "@/types";

const FileUploader = ({
  onChange,
  initialUrls = [],
}: FileUploaderProps & { initialUrls?: string[] }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>(initialUrls); // start with initial URLs

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      onChange(updatedFiles);

      // Generate previews for new files and keep old URLs
      const fileUrls = acceptedFiles.map((file) => convertFileToUrl(file));
      setPreviews([...previews, ...fileUrls]);
    },
    [files, previews, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onChange(updatedFiles);
  };

  // Clean up object URLs created from files
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [previews]);

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="file-upload cursor-pointer border-2 border-dashed border-gray-400 p-4 rounded-md text-center"
      >
        <input {...getInputProps()} />
        <Image
          src="/assets/icons/upload.svg"
          width={40}
          height={40}
          alt="upload"
          className="mx-auto"
        />
        <div className="file-upload_label">
          <p className="text-14-regular">
            <span className="text-green-500">Click to upload </span>
            or drag and drop
          </p>
          <p className="text-12-regular">
            SVG, PNG, JPG, GIF, PDF (max. 5MB each)
          </p>
        </div>
      </div>

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((url, index) => {
            const isImage =
              url.startsWith("blob:") ||
              (url.startsWith("http") &&
                (url.endsWith(".png") ||
                  url.endsWith(".jpg") ||
                  url.endsWith(".jpeg") ||
                  url.endsWith(".gif")));

            return (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden p-2 bg-dark-400"
              >
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
                >
                  ✕
                </button>

                {isImage ? (
                  <Image
                    src={url}
                    alt={`preview-${index}`}
                    width={150}
                    height={100}
                    className="object-cover w-full h-32"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-white text-xs">
                    📄 File
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
