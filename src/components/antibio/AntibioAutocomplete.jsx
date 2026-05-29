import React, { useState, useEffect, useRef } from 'react';
import { THERAPIES } from '../../data/antibio/therapies';

export default function AntibioAutocomplete({ 
  onSubmitGuess, 
  status, 
  attemptedTherapies,
  allowedIds = null
}) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showIncorrectBadge, setShowIncorrectBadge] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowDropdown(true);
    setShowIncorrectBadge(false);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const getFilteredTherapies = () => {
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery.length < 3) return [];
    
    const lowerQuery = removeAccents(cleanQuery);
    
    return THERAPIES.filter(d => {
      if (allowedIds && !allowedIds.includes(d.id)) return false;

      const isAttempted = attemptedTherapies.some(att => att.id === d.id);
      if (isAttempted) return false; // Hide strictly attempted ones

      const dNameClean = removeAccents(d.name.toLowerCase());
      const matchName = dNameClean.includes(lowerQuery);
      
      const matchAlias = d.aliases.some(alias => {
          const aliasClean = removeAccents(alias.toLowerCase());
          return aliasClean.includes(lowerQuery);
      });
      
      return matchName || matchAlias;
    }).slice(0, 50); 
  };

  const filtered = getFilteredTherapies();

  const handleSelect = (therapy) => {
    setQuery('');
    setShowDropdown(false);
    
    const isHit = onSubmitGuess(therapy.id);
    if (!isHit && status === 'playing') {
       setShowIncorrectBadge(true);
       setTimeout(() => setShowIncorrectBadge(false), 2500); 
    }
  };

  const disabled = status !== 'playing';

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      
      {/* Badge Incorreto */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden z-10 ${showIncorrectBadge ? 'max-h-12 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'}`}>
         <div className="bg-red-500/20 border border-red-500/50 text-red-400 font-semibold px-4 py-1.5 rounded-full flex items-center gap-2 text-sm shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            INCORRETO
         </div>
      </div>

      <div ref={wrapperRef} className="relative w-full z-20">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Pesquise o antibiótico ou conduta (ex: 'Suporte')"
          disabled={disabled}
          className="w-full bg-slate-800/80 border border-slate-700 text-slate-100 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-400 transition-all placeholder:text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
        />
        
        {showDropdown && filtered.length > 0 && !disabled && (
          <ul className="absolute left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto no-scrollbar z-30">
            {filtered.map(item => (
              <li 
                key={item.id} 
                className="px-5 py-3 hover:bg-slate-700/80 cursor-pointer text-slate-200 border-b border-slate-700/50 last:border-0 transition-colors"
                onClick={() => handleSelect(item)}
              >
                <div className="font-medium">{item.name}</div>
              </li>
            ))}
          </ul>
        )}

        {showDropdown && query.length > 0 && filtered.length === 0 && !disabled && (
           <div className="absolute left-0 right-0 mt-2 bg-slate-800/95 border border-slate-700 rounded-xl p-4 text-center text-slate-400 shadow-2xl z-30">
              {query.length < 3 ? 'Digite ao menos 3 caracteres...' : 'Nenhuma correspondência encontrada.'}
           </div>
        )}
      </div>

      {/* Red Pills Fixadas Abaixo */}
      {attemptedTherapies.length > 0 && (
         <div className="w-full mt-4 flex flex-wrap gap-2 justify-center z-10">
            {attemptedTherapies.map(dia => (
                <div key={dia.id} className="bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                   <svg className="w-3.5 h-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                   {dia.name}
                </div>
            ))}
         </div>
      )}
    </div>
  );
}
