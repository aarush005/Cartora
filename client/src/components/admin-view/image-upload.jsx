import React, { useRef, useState } from "react";
import axios from "axios";

const ProductImageUpload = ({ setUploadedImageUrl }) => {

  const inputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFile(file) {
    if (!file) return;

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    uploadImage(file);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function uploadImage(file) {

    const data = new FormData();
    data.append("my-file", file);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data,
      {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      }
    );

    if (response.data?.success) {
      setUploadedImageUrl(response.data.imageUrl);
    }
  }

  function removeImage() {
    setImageFile(null);
    setPreview(null);
    setUploadProgress(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">

      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {!preview ? (
        <div
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed p-6 rounded-lg text-center cursor-pointer"
        >
          <p className="font-medium">Drag & Drop Image</p>
          <p className="text-sm text-gray-500">
            or click to upload
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-3">

          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-md"
          />

          {uploadProgress < 100 && (
            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="bg-black h-2 rounded"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <div className="flex justify-between items-center mt-2">
            <p className="text-sm truncate">
              {imageFile?.name}
            </p>

            <button
              onClick={removeImage}
              className="bg-black text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

export default ProductImageUpload;