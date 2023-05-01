import React from 'react';

function FormInput( {handleInputChange}) {

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', width:'80%' }}>
      <label style={{ color: 'black', width:'100%' }} htmlFor="title">Title of song :</label>
      <input style={{width:'200px', height:'20px'}}className="input-form" type="text" id="title" name="title" onChange={handleInputChange} />
  </div>
  );
}
export default FormInput;