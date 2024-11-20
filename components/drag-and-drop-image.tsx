// import fileToBase64 from "@/actions/convert-file-to-base64";
import { Dropzone, ExtFile, FileMosaic, FileMosaicProps } from "@files-ui/react";
import axios from "axios";
import * as React from "react";

export default function DragAndDropImage({
  handleImages,
}: {
  handleImages: (urls: string[]) => void;
}) {
  const [files, setFiles] = React.useState<ExtFile[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [uploadedUrls, setUploadedUrls] = React.useState<string[]>([]);

  const updateFiles = async (incomingFiles: ExtFile[]) => {
    setUploading(true);

    const urls = await Promise.all(
      incomingFiles.map(async (fileWrapper) => {
        const file = fileWrapper.file as File;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "rvtu8kfa"); // Reemplaza con tu preset de Cloudinary

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Reemplaza con tu URL
            formData
          );

          const secureUrl = response.data.secure_url;
          return secureUrl;
        } catch (error) {
          console.error("Error uploading file to Cloudinary", error);
          return "";
        }
      })
    );

    const validUrls = urls.filter((url) => url !== "");
    setUploadedUrls((prev) => [...prev, ...validUrls]);
    handleImages([...uploadedUrls, ...validUrls]);
    setFiles(incomingFiles);
    setUploading(false);
  };

  const removeFile = (id: FileMosaicProps["id"]) => {
    setFiles(files.filter((x) => x.id !== id));
    const newUrls = uploadedUrls.filter((_, index) => index !== files.findIndex((file) => file.id === id));
    setUploadedUrls(newUrls);
    handleImages(newUrls);
  };

  return (
    <div>
      {uploading && <p>Uploading images...</p>}
      <Dropzone
        header={false}
        footer={false}
        label="+ Agrega imágenes"
        accept=".webp,.png,.jpg,.jpeg/*"
        maxFiles={5} // Ajusta el número máximo de imágenes
        minHeight={"135px"}
        onChange={updateFiles}
        value={files}
      >
        {files.map((file) => (
          <FileMosaic
            key={file.id}
            {...file}
            onDelete={removeFile}
            preview
            resultOnTooltip
            alwaysActive
          />
        ))}
      </Dropzone>
    </div>
  );
}
