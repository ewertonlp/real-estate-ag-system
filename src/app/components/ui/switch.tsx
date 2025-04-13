import { useState } from 'react';

export function Switch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center">
      <label className="flex items-center cursor-pointer">
        {/* Input hidden */}
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        
        {/* Container do Switch */}
        <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-blue-500' : 'bg-gray-300'
        }`}>
          {/* Bolinha deslizante */}
          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
            enabled ? 'translate-x-full' : 'translate-x-0'
          }`} />
        </div>
        
        {/* Label opcional */}
        <span className="ml-3 text-gray-700">
          {enabled ? 'Ativo' : 'Inativo'}
        </span>
      </label>
    </div>
  );
}