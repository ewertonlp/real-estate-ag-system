"use client";

import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

export default function UploadImage() {
  const [files, setFiles] = useState([]);

  return (
    <FilePond
      files={files}
      onupdatefiles={setFiles}
      allowMultiple={true}
      maxFiles={3}
      acceptedFileTypes={["image/*"]}
      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      className=" border-gray-400 p-6 rounded-sm"
    />
  );
}

