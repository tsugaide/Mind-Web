import { upload } from "@imagekit/vue";
import imageCompression from "browser-image-compression";
import { defineStore } from "pinia";

export const useImageStore = defineStore("image", () => {
  const authenticate = async () => {
    const res = await fetch(`${import.meta.env.VITE_FETCH_API}/imageUp`);
    if (!res.ok) throw new Error("Auth failed");
    return await res.json();
  };

  const uploadImage = async (files) => {
    try {
      const creds = await authenticate();

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const uploadedUrls = await Promise.all(
        files.map(async (f) => {
          const compressedFile = await imageCompression(f, options);

          const res = await upload({
            ...creds,
            file: compressedFile,
            fileName: f.name,
          });

          return { url: res.url, id: res.fileId };
        })
      );

      return uploadedUrls;
    } catch (err) {
      console.error("Upload gagal:", err);
      throw err;
    }
  };

  return { uploadImage };
});
