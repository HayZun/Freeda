import React, { useState } from "react";
import DropZone from "./DropZone";
import { toast } from "react-toastify";

function DropImage( {handleImageChange}) {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault(); // empêcher l'ouverture de la nouvelle fenêtre
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) {
      return;
    }
    if (droppedFile && droppedFile.type.match("image.*")) {
      setFile(droppedFile);
      handleImageChange(droppedFile); // appel de la fonction de rappel avec le fichier sélectionné
    } else {
      toast.error('Invalid file type. Please upload an image.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      document.getElementById("image-upload").click();
    }
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.match("image.*")) {
      setFile(selectedFile);
      handleImageChange(selectedFile);
    } else {
      toast.error('Invalid file type. Please upload an image.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };
  

  const handleDeleteImage = () => {
    setFile(null);
  };

  return (
    <div>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
      <DropZone
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleClick={handleClick}
        file={file}
        acceptedFileType="image"
        label="Drag and drop or click to upload an image"
        handleDelete={handleDeleteImage}
      />
    </div>
  );
}

export default DropImage;
