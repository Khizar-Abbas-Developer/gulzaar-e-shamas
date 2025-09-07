export const uploadToCloudinary = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "documents_upload"); // <-- your actual preset
    formData.append("folder", "documents");
    formData.append("resource_type", "auto");
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudinary upload failed:", errorText);
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  });

  return Promise.all(uploadPromises);
};
