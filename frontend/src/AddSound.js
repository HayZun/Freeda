import React, { useState } from 'react';
import DropAudio from './DropAudio';
import DropImage from './DropImage';
import FormInput from './FormInput';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid'; // Importer uuidv4 depuis la bibliothèque uuid
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form(props) {

  const [formData, setFormData] = useState({
    title: '',
    audio: null,
    image: null
  });

  const handleSubmit = (event) => {
  event.preventDefault();
  if (formData.title && formData.audio && formData.image) {

    // Ajouter l'ID unique au formulaire
    const id = uuidv4();

    // Créer un objet FormData pour envoyer les données
    const formdata = new FormData();
    formdata.append('id', id); // Ajouter l'ID unique à FormData
    formdata.append('title', formData.title);
    formdata.append('audio', formData.audio);
    formdata.append('image', formData.image);

    // Vérifier si le dossier existe déjà
    fetch(`${props.apiUrl}/folder-exists/${formData.title}`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        toast.error('Folder already exists. Please choose a different title.', {
          position: toast.POSITION.TOP_RIGHT
        });
      } else {
        // Faire un POST vers le serveur Flask
        fetch(`${props.apiUrl}/submit-form`, {
          method: 'POST',
          body: formdata
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            toast.success('Form submitted successfully', {
              position: toast.POSITION.TOP_RIGHT
            });
          } else {
            toast.error('Form submission failed.', {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
            .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
  } else {
    // Notification d'erreur
    console.log("Please fill in all fields before submitting the form.")
    toast.error('Please fill in all fields before submitting the form.', {
      position: toast.POSITION.TOP_RIGHT
    });
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAudioChange = (selectedFile) => {
    setFormData({ ...formData, audio: selectedFile });
  };

  const handleImageChange = (selectedFile) => {
    setFormData({ ...formData, image: selectedFile });
  };

  return (
    <motion.form className='form' onSubmit={handleSubmit}
    animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }} 
        initial={{ opacity: 0, scale: 0 }} 
        transition= {{duration: 0.5}}
        layout>
      <FormInput  handleInputChange={handleInputChange} />
      <h2 className='form-h2'>Upload a new song :</h2>
      <DropAudio handleAudioChange={handleAudioChange} />
      <br />
      <br />
      <h2 className='form-h2'>Upload a new image :</h2>
      <DropImage handleImageChange={handleImageChange} />
      <button type="submit">Submit</button>
    </motion.form>
  );
}

export default Form;
