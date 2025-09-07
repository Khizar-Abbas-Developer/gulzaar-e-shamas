"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { FileUploaderProps } from "@/types";

const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = [...files, ...acceptedFiles];
      setFiles(updatedFiles);
      onChange(updatedFiles);

      // Generate previews for all files
      const fileUrls = updatedFiles.map((file) => convertFileToUrl(file));
      setPreviews(fileUrls);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true, // ✅ allow multiple files
  });

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onChange(updatedFiles);
  };

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
            const file = files[index];
            const isImage = file.type.startsWith("image/");

            return (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden p-2 bg-dark-400"
              >
                {/* Remove button */}
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
                    alt={file.name}
                    width={150}
                    height={100}
                    className="object-cover w-full h-32"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-white text-xs">
                    📄 {file.name}
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

// ("use client");
// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import { convertFileToUrl } from "@/lib/utils";
// import { FileUploaderProps } from "@/types";

// const FileUploader = ({ onChange }: FileUploaderProps) => {
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       onChange(acceptedFiles);

//       // Generate preview for the first file
//       if (acceptedFiles.length > 0) {
//         const fileUrl = convertFileToUrl(acceptedFiles[0]);
//         setPreviewUrl(fileUrl);
//       }
//     },
//     [onChange]
//   );

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   // Cleanup the object URL when the component unmounts or files change
//   useEffect(() => {
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl);
//       }
//     };
//   }, [previewUrl]);

//   return (
//     <div {...getRootProps()} className="file-upload">
//       <input {...getInputProps()} />
//       {previewUrl ? (
//         <Image
//           src={previewUrl}
//           width={1000}
//           height={1000}
//           alt="uploaded-image"
//           className="max-h-[400px] overflow-hidden object-cover"
//         />
//       ) : (
//         <>
//           <Image
//             src="/assets/icons/upload.svg"
//             width={40}
//             height={40}
//             alt="upload"
//           />
//           <div className="file-upload_label">
//             <p className="text-14-regular ">
//               <span className="text-green-500">Click to upload </span>
//               or drag and drop
//             </p>
//             <p className="text-12-regular">
//               SVG, PNG, JPG, or GIF (max. 800x400px)
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default FileUploader;
