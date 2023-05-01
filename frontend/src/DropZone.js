import React from 'react';

function DropZone({ handleDrop, handleDragOver, handleClick, file, acceptedFileType, label, handleDelete  }) {  

  return (
    <div    
      className='drop-zone'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      style={{ display: 'float', width: '420px', height: '150px', border: '3px dashed white', padding: 10, textAlign: 'center', color: 'white', cursor: 'pointer' }}
    >
      {file ? (
        <div className='file-preview' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {acceptedFileType === 'audio' ? (
            <img srcSet='/son.png' alt='Uploaded file' />
          ) : (
            <img srcSet='/picture.jpg' alt='Uploaded file' />
          )}
          <div className='file-info'>
            <p style={{ color: 'black' }}>{file.name}</p>
            <button className="deleteBtn" type='button' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p style={{ color: 'rgb(0, 11, 172)' }}>{label}</p>
      )}
    </div>
  );
}

export default DropZone;
