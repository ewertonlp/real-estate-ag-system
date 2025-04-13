'use client'

import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'PT-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'ZH', name: '中文', flag: '🇨🇳' }
  ];

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
    // Aqui você pode implementar a mudança de idioma
    console.log('Idioma selecionado:', code);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 hover:bg-[var(--hover)] dark:hover:bg-[var(--hover)] rounded-lg cursor-pointer"
      >
        <GlobeAltIcon className="h-6 w-6 text-text dark:text-text" />
        <span className="font-normal text-text dark:text-text">
          {languages.find(lang => lang.code === selectedLanguage)?.code}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] dark:bg-[var(--card)] rounded-md shadow-lg py-2 z-50 cursor-pointer">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-4 py-2 text-sm text-left cursor-pointer ${
                selectedLanguage === lang.code 
                  ? 'bg-blue-50 text-primary dark:bg-[var(--hover)]' 
                  : 'text-text hover:bg-[var(--hover)] dark:text-text dark:bg-[var(--card)]'
              }`}
            >
              <span className="mr-2 text-lg">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}