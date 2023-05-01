import React, { useState } from "react";
import DropZone from "./DropZone";
import { toast } from "react-toastify";

function DropAudio( { handleAudioChange } ) {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault(); // empêcher l'ouverture de la nouvelle fenêtre
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) {
      return;
    }
    if (droppedFile.type.match("audio.*")) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(droppedFile);
      audio.onloadedmetadata = () => {
        if (audio.duration > 10) {
          toast.error('The audio file is longer than 10 seconds. Please choose a shorter file..', {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          setFile(droppedFile);
          handleAudioChange(droppedFile); // appel de la fonction de rappel avec le fichier sélectionné
        }
        URL.revokeObjectURL(audio.src);
      };
    } else {
      toast.error('Invalid file type. Please upload an audio file..', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = (event) => {
    if (event.target.tagName !== 'BUTTON') {
      document.getElementById("audio-upload").click();
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault(); // empêcher l'ouverture de la nouvelle fenêtre
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return; // L'utilisateur a cliqué sur le bouton "Cancel"
    }
    if (selectedFile.type.match("audio.*")) {
      const audio = new Audio();
      audio.src = URL.createObjectURL(selectedFile);
      audio.onloadedmetadata = () => {
        if (audio.duration > 10) {
          toast.error('The audio file is longer than 10 seconds. Please choose a shorter file.', {
           position: toast.POSITION.TOP_RIGHT
         });
        } else {
          setFile(selectedFile);
          handleAudioChange(selectedFile); // appel de la fonction de rappel avec le fichier sélectionné
        }
        URL.revokeObjectURL(audio.src);
      };
    } else {
      toast.error('Invalid file type. Please upload an audio file', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleDeleteAudio = () => {
    setFile(null);
  };

  return (
    <div>
      <input
        type="file"
        id="audio-upload"
        accept=".mp3"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
      <DropZone
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        handleClick={handleClick}
        file={file}
        acceptedFileType="audio"
        label="Drag and drop or click to upload an audio file"
        handleDelete={handleDeleteAudio}
      />
    </div>
  );
}


export default DropAudio;
