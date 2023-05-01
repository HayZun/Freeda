import React, { useState, useEffect } from 'react';

function LanguageDropdown(props) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  useEffect(() => {
    const getLanguages = async () => {
      const response = await fetch('https://flagcdn.com/en/codes.json');
      const data = await response.json();

      // Filter out languages that don't have a Google Translate TTS voice
      const gttsLanguages = Object.entries(data)
        .map(([key, value]) => ({ code: key, name: value, src: 'https://flagcdn.com/16x12/'+key+'.png', srcset: 'https://flagcdn.com/32x24/'+key+'.png 2x, https://flagcdn.com/48x36/'+key+'.png 3x', alt: value}));
      setLanguages(gttsLanguages);
    };

    getLanguages();
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'baseline', width:'80%' }}>
      <label htmlFor="language-select">Language:</label>
      <select className="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language, index) => (
          <option key={index} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageDropdown;

