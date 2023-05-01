import React, { useState, useEffect } from 'react';

function LanguageDropdown(props) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  useEffect(() => {
    const getLanguages = async () => {

      const data = {};

      // Get the list of languages from the Google Translate API
      data['af'] = 'Afrikaans'
      data['sq'] = 'Albanian'
      data['ar'] = 'Arabic'
      data['hy'] = 'Armenian'
      data['bn'] = 'Bengali'
      data['bs'] = 'Bosnian'
      data['bg'] = 'Bulgarian'
      data['ca'] = 'Catalan'
      data['ceb'] = 'Cebuano'
      data['zh-CN'] = 'Chinese (Mandarin/China)'
      data['zh-TW'] = 'Chinese (Mandarin/Taiwan)'
      data['hr'] = 'Croatian'
      data['cs'] = 'Czech'
      data['da'] = 'Danish'
      data['nl'] = 'Dutch'
      data['en'] = 'English'
      data['en-AU'] = 'Australian English'
      data['en-GB'] = 'British English'
      data['en-US'] = 'American English'
      data['eo'] = 'Esperanto'
      data['et'] = 'Estonian'
      data['tl'] = 'Filipino'
      data['fi'] = 'Finnish'
      data['fr'] = 'French'
      data['fr-CA'] = 'Canadian French'
      data['gl'] = 'Galician'
      data['ka'] = 'Georgian'
      data['de'] = 'German'
      data['el'] = 'Greek'
      data['gu'] = 'Gujarati'
      data['ht'] = 'Haitian Creole'
      data['ha'] = 'Hausa'
      data['he'] = 'Hebrew'
      data['hi'] = 'Hindi'
      data['hmn'] = 'Hmong'
      data['hu'] = 'Hungarian'
      data['is'] = 'Icelandic'
      data['ig'] = 'Igbo'
      data['id'] = 'Indonesian'
      data['ga'] = 'Irish'
      data['it'] = 'Italian'
      data['ja'] = 'Japanese'
      data['jw'] = 'Javanese'
      data['kn'] = 'Kannada'
      data['kk'] = 'Kazakh'
      data['km'] = 'Khmer'
      data['rw'] = 'Kinyarwanda'
      data['ko'] = 'Korean'
      data['ku'] = 'Kurdish'
      data['ky'] = 'Kyrgyz'
      data['lo'] = 'Lao'
      data['la'] = 'Latin'
      data['lv'] = 'Latvian'
      data['lt'] = 'Lithuanian'
      data['lb'] = 'Luxembourgish'
      data['mk'] = 'Macedonian'
      data['mg'] = 'Malagasy'
      data['ms'] = 'Malay'
      data['ml'] = 'Malayalam'
      data['mt'] = 'Maltese'
      data['mi'] = 'Maori'
      data['mr'] = 'Marathi'
      data['mn'] = 'Mongolian'
      data['my'] = 'Burmese'
      data['ne'] = 'Nepali'
      data['no'] = 'Norwegian'
      data['ny'] = 'Nyanja'
      data['or'] = 'Odia'
      data['ps'] = 'Pashto'
      data['fa'] = 'Persian'
      data['pl'] = 'Polish'
      data['pt'] = 'Portuguese'
      data['pa'] = 'Punjabi'
      data['ro'] = 'Romanian'
      data['ru'] = 'Russian'


      // Filter out languages that don't have a Google Translate TTS voice
      const gttsLanguages = Object.entries(data)
        .map(([key, value]) => ({ code: key, name: value, alt: value}));
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

