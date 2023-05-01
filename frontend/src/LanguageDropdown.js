import React, { useState, useEffect } from 'react';

function LanguageDropdown(props) {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');

  useEffect(() => {
    const getLanguages = async () => {

      const data = {};

      // Add additional languages
      data['ar'] = 'Arabic';
      data['bn'] = 'Bengali';
      data['bs'] = 'Bosnian';
      data['ca'] = 'Catalan';
      data['cs'] = 'Czech';
      data['cy'] = 'Welsh';
      data['da'] = 'Danish';
      data['de'] = 'German';
      data['el'] = 'Greek';
      data['en-AU'] = 'Australian English';
      data['en-GB'] = 'British English';
      data['en-IN'] = 'Indian English';
      data['en-US'] = 'American English';
      data['es'] = 'Spanish';
      data['es-ES'] = 'European Spanish';
      data['es-LA'] = 'Latin American Spanish';
      data['et'] = 'Estonian';
      data['fi'] = 'Finnish';
      data['fil'] = 'Filipino';
      data['fr'] = 'French';
      data['fr-CA'] = 'Canadian French';
      data['gu'] = 'Gujarati';
      data['hi'] = 'Hindi';
      data['hr'] = 'Croatian';
      data['hu'] = 'Hungarian';
      data['hy'] = 'Armenian';
      data['id'] = 'Indonesian';
      data['is'] = 'Icelandic';
      data['it'] = 'Italian';
      data['ja'] = 'Japanese';
      data['jv'] = 'Javanese';
      data['kn'] = 'Kannada';
      data['km'] = 'Khmer';
      data['ko'] = 'Korean';
      data['ku'] = 'Kurdish';
      data['ky'] = 'Kyrgyz';
      data['lo'] = 'Lao';
      data['lt'] = 'Lithuanian';
      data['lv'] = 'Latvian';
      data['mk'] = 'Macedonian';
      data['ml'] = 'Malayalam';
      data['mn'] = 'Mongolian';
      data['mr'] = 'Marathi';
      data['ms'] = 'Malay';
      data['mt'] = 'Maltese';
      data['my'] = 'Burmese';
      data['ne'] = 'Nepali';
      data['nl'] = 'Dutch';
      data['no'] = 'Norwegian';
      data['pl'] = 'Polish';
      data['pt'] = 'Portuguese';
      data['pt-BR'] = 'Brazilian Portuguese';
      data['pt-PT'] = 'European Portuguese';
      data['ro'] = 'Romanian';
      data['ru'] = 'Russian';
      data['si'] = 'Sinhala';
      data['sk'] = 'Slovak';
      data['sl'] = 'Slovenian';
      data['sq'] = 'Albanian';
      data['sr'] = 'Serbian';
      data['su'] = 'Sundanese';
      data['sv'] = 'Swedish';
      data['sw'] = 'Swahili';
      data['ta'] = 'Tamil';
      data['te'] = 'Telugu';
      data['th'] = 'Thai';
      data['tl'] = 'Filipino';
      data['tr'] = 'Turkish';
      data['uk'] = 'Ukrainian';
      data['ur'] = 'Urdu';
      data['uz'] = 'Uzbek';
      data['vi'] = 'Vietnamese';
      data['zh-CN'] = 'Chinese (Mandarin/China)';
      data['zh-TW'] = 'Chinese (Mandarin/Taiwan)';
      data['zu'] = 'Zulu';

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

