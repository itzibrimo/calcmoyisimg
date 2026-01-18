import React, { useState } from 'react';
import { Subject } from '../types';

interface SubjectRowProps {
  subject: Subject;
  marks: Record<string, string>;
  onMarkChange: (inputLabel: string, value: string) => void;
  onUpdateSubject: (updatedSubject: Subject) => void;
  calculatedAverage?: number;
}

const SubjectRow: React.FC<SubjectRowProps> = ({ subject, marks, onMarkChange, onUpdateSubject, calculatedAverage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newInputName, setNewInputName] = useState('');

  const handleRemoveInput = (inputToRemove: string) => {
    const updatedInputs = subject.inputs.filter(i => i !== inputToRemove);
    onUpdateSubject({ ...subject, inputs: updatedInputs });
  };

  const handleAddInput = () => {
    if (newInputName.trim() && !subject.inputs.includes(newInputName.trim())) {
      const updatedInputs = [...subject.inputs, newInputName.trim()];
      onUpdateSubject({ ...subject, inputs: updatedInputs });
      setNewInputName('');
    }
  };

  const handleChangeCoef = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
      onUpdateSubject({ ...subject, coef: val });
    }
  };

  return (
    <div className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl shadow-lg border border-slate-700/50 mb-4 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-0.5">
      
      {/* Glow effect on hover (only when not editing) */}
      {!isEditing && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:animate-shimmer" />}

      <div className="relative z-10 flex flex-wrap items-center gap-3 mb-4 pr-10">
        <h3 className="font-semibold text-lg text-slate-100 tracking-tight flex-grow">{subject.name}</h3>
        
        {/* Edit Toggle Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`absolute top-0 right-0 p-2 rounded-full transition-colors ${isEditing ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:text-blue-400 hover:bg-slate-700/50'}`}
          title="Modifier la matière"
        >
          {isEditing ? (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          )}
        </button>

        {!isEditing ? (
          <span className="text-xs font-medium text-slate-400 bg-slate-700/50 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-600">
            Coef: {subject.coef}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400">Coef:</label>
            <input 
              type="number" 
              value={subject.coef} 
              onChange={handleChangeCoef}
              className="w-16 px-2 py-1 bg-slate-900 border border-blue-500 rounded text-sm focus:outline-none"
            />
          </div>
        )}

        {calculatedAverage !== undefined && !isEditing && (
          <span className={`ml-auto md:ml-2 text-sm font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md transition-all duration-500 ${
            calculatedAverage >= 10 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          }`}>
            Moy: {calculatedAverage.toFixed(2)}
          </span>
        )}
      </div>

      {isEditing ? (
        <div className="relative z-10 bg-slate-900/40 p-3 rounded-lg border border-slate-700/50 mb-2 animate-in fade-in slide-in-from-top-2">
            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide font-bold">Configuration des Notes</p>
            <div className="flex flex-wrap gap-2 mb-3">
                {subject.inputs.map(input => (
                    <span key={input} className="flex items-center gap-1 bg-blue-500/10 text-blue-300 px-2 py-1 rounded text-xs border border-blue-500/20">
                        {input}
                        <button onClick={() => handleRemoveInput(input)} className="hover:text-red-400 ml-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                    </span>
                ))}
            </div>
            
            <div className="flex items-center gap-2">
                <input 
                    type="text" 
                    placeholder="Ajouter (ex: DS 2, Projet)" 
                    value={newInputName}
                    onChange={(e) => setNewInputName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddInput()}
                    className="flex-grow px-3 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm focus:border-blue-500 focus:outline-none"
                />
                <button 
                    onClick={handleAddInput}
                    disabled={!newInputName.trim()}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                    Ajouter
                </button>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                 {/* Quick Add Buttons */}
                 {['Examen', 'DS', 'TP', 'DS 2', 'Oral'].filter(opt => !subject.inputs.includes(opt)).map(opt => (
                     <button 
                        key={opt} 
                        onClick={() => {
                            const updatedInputs = [...subject.inputs, opt];
                            onUpdateSubject({ ...subject, inputs: updatedInputs });
                        }}
                        className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-1 rounded hover:bg-slate-700 hover:text-white transition-all whitespace-nowrap"
                     >
                        + {opt}
                     </button>
                 ))}
            </div>
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {subject.inputs.map((label) => (
            <div key={label} className="flex flex-col space-y-1.5">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider pl-1">{label}</label>
                <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={marks[label] || ''}
                onChange={(e) => onMarkChange(label, e.target.value)}
                placeholder="0-20"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none text-sm transition-all shadow-inner"
                />
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SubjectRow;