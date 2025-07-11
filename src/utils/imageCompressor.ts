import imageCompression from "browser-image-compression";

export const compressImages = async (files: File[]) => {
  const compressedFiles = await Promise.all(
    files.map(async (file) => {
      const compressedBlob = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      return new File(
        [compressedBlob],
        file.name,
        { type: compressedBlob.type }
      );
    })
  );
  return compressedFiles;
};
