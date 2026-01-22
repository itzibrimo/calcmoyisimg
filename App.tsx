import React, { useState, useEffect, useCallback } from 'react';
import { DATA } from './constants';
import { GradeMap, Subject } from './types';
import SubjectRow from './components/SubjectRow';

const App: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  
  // Local state for subjects to allow editing (Coef, Inputs, etc.)
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [marks, setMarks] = useState<GradeMap>({});
  const [showResults, setShowResults] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Derived state options
  const majors = Object.keys(DATA);
  const years = selectedMajor ? Object.keys(DATA[selectedMajor] || {}) : [];
  const semesters = (selectedMajor && selectedYear) ? Object.keys(DATA[selectedMajor][selectedYear] || {}) : [];

  // Initialize subjects when selection changes
  useEffect(() => {
    if (selectedMajor && selectedYear && selectedSemester) {
      const defaultSubjects = DATA[selectedMajor][selectedYear][selectedSemester]?.subjects || [];
      // Deep copy to ensure we don't mutate the constants and allow local editing
      setSubjects(JSON.parse(JSON.stringify(defaultSubjects)));
      setMarks({});
      setShowResults(false);
    } else {
      setSubjects([]);
    }
  }, [selectedMajor, selectedYear, selectedSemester]);

  // Handle updates from SubjectRow (changing coef, adding/removing inputs)
  const handleSubjectUpdate = (updatedSubject: Subject) => {
    setSubjects(prev => prev.map(sub => sub.id === updatedSubject.id ? updatedSubject : sub));
  };

  const handleGoHome = () => {
    setSelectedMajor('');
    setSelectedYear('');
    setSelectedSemester('');
    setSubjects([]);
    setMarks({});
    setShowResults(false);
  };

  const handleContextChange = (type: 'major' | 'year' | 'semester', value: string) => {
    if (type === 'major') {
      setSelectedMajor(value);
      setSelectedYear('');
      setSelectedSemester('');
    } else if (type === 'year') {
      setSelectedYear(value);
      setSelectedSemester('');
    } else {
      setSelectedSemester(value);
    }
  };

  const handleMarkChange = useCallback((subjectId: string, inputLabel: string, value: string) => {
    if (value === '') {
        setMarks(prev => ({
          ...prev,
          [subjectId]: { ...prev[subjectId], [inputLabel]: value }
        }));
        return;
    }
    const numericValue = parseFloat(value);
    if ((!isNaN(numericValue) && numericValue >= 0 && numericValue <= 20) || value === '.') {
        setMarks(prev => ({
          ...prev,
          [subjectId]: { ...prev[subjectId], [inputLabel]: value }
        }));
    }
  }, []);

  /**
   * Dynamic Formula Logic:
   * 1. If 'Examen' exists: 
   *    Formula = 0.7 * Examen + 0.3 * Average(All Other Inputs)
   *    (This covers Examen+DS, Examen+TP, Examen+DS+TP cases)
   * 2. If 'Examen' does NOT exist:
   *    Formula = Average(All Inputs)
   *    (This covers DS+TP, or 2 DS, etc.)
   */
  const calculateSubjectAverage = (subject: Subject): number => {
    const subjectMarks = marks[subject.id] || {};
    
    const getVal = (label: string) => {
        const val = subjectMarks[label];
        if (!val || val.trim() === '') return 0;
        const parsed = parseFloat(val);
        return isNaN(parsed) ? 0 : parsed;
    };

    const inputs = subject.inputs;
    if (!inputs || inputs.length === 0) return 0;

    // Check if Examen is present
    const hasExamen = inputs.some(i => i.toLowerCase() === 'examen');
    
    if (hasExamen) {
        // Find exact label for examen (case insensitive match, though usually 'Examen')
        const examenLabel = inputs.find(i => i.toLowerCase() === 'examen') || 'Examen';
        const examenScore = getVal(examenLabel);
        
        const otherInputs = inputs.filter(i => i !== examenLabel);
        
        if (otherInputs.length === 0) {
            return examenScore;
        }

        const othersSum = otherInputs.reduce((acc, curr) => acc + getVal(curr), 0);
        const othersAvg = othersSum / otherInputs.length;

        // 70% Exam, 30% Continuous Assessment Average
        return (0.7 * examenScore) + (0.3 * othersAvg);
    } else {
        // Simple Average if no Exam
        const total = inputs.reduce((acc, curr) => acc + getVal(curr), 0);
        return total / inputs.length;
    }
  };

  const calculateTotal = () => {
    let totalScore = 0;
    let totalCoef = 0;

    subjects.forEach(sub => {
      const avg = calculateSubjectAverage(sub);
      totalScore += avg * sub.coef;
      totalCoef += sub.coef;
    });

    return totalCoef === 0 ? 0 : totalScore / totalCoef;
  };

  const finalAverage = calculateTotal();

  return (
    <div className="min-h-screen bg-slate-900 pb-24 font-sans text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
         <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
         <div className="absolute -bottom-[10%] left-[20%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
             <div className="flex items-center gap-4">
                {selectedMajor && (
                  <button 
                    onClick={handleGoHome}
                    className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700 hover:border-blue-500/50 group shrink-0"
                    title="Retour à l'accueil"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                )}
                
                {/* University Branding */}
                <div className="flex items-center gap-3">
                   {/* Logo Container - Using standard ISIMG logo URL or fallback */}
                   <div className="relative bg-white p-1.5 rounded-xl shadow-lg shadow-blue-500/10 overflow-hidden shrink-0">
                      <img 
                        src="https://isimg.rnu.tn/sites/default/files/logo_0.png" 
                        onError={(e) => {
                           // Handle broken image by showing fallback text
                           e.currentTarget.style.display = 'none'; 
                           const fallback = document.getElementById('logo-fallback');
                           if(fallback) fallback.classList.remove('hidden');
                           e.currentTarget.parentElement?.classList.remove('bg-white');
                        }}
                        alt="ISIMG" 
                        className="h-10 w-auto object-contain" 
                      />
                      {/* Fallback if image fails to load */}
                      <div id="logo-fallback" className="hidden h-10 w-10 flex items-center justify-center">
                         <img src="isimglogo.png" alt="ISIMG Logo" className="h-10 w-auto object-contain" />
                      </div>
                   </div>

                   {/* Title Text */}
                   <div className="flex flex-col justify-center">
                      <h1 className="hidden md:block text-sm font-bold text-white leading-tight">
                        Institut Supérieur d'Informatique <br/> et de Multimédia de Gabès
                      </h1>
                      <h1 className="md:hidden text-lg font-bold text-white leading-tight">
                        ISIM Gabès
                      </h1>
                      <p className="text-slate-400 text-[10px] font-medium tracking-wide">Calculateur de Moyenne</p>
                   </div>
                </div>
             </div>

             {/* PWA Install Button (Mobile Visible) */}
             {deferredPrompt && (
               <button 
                 onClick={handleInstallClick}
                 className="md:hidden ml-auto bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-blue-500/20 animate-pulse whitespace-nowrap"
               >
                 Installer
               </button>
             )}
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
             {/* PWA Install Button (Desktop Visible) */}
             {deferredPrompt && (
               <button 
                 onClick={handleInstallClick}
                 className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-700 transition-all hover:border-blue-500/30"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                 Installer l'App
               </button>
             )}

             {showResults && (
                <div className={`flex items-center px-5 py-2 rounded-xl font-bold text-xl shadow-lg border backdrop-blur-md transition-all duration-500 animate-in slide-in-from-top-4 ${
                    finalAverage >= 10 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/10' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/10'
                }`}>
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mr-3">Moyenne</span>
                  {finalAverage.toFixed(2)}
                </div>
             )}
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 py-8 z-10">
        
        {/* Selection Area */}
        <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-700/50 mb-8 transition-all hover:border-slate-600/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2 relative z-10">
            <span className="w-1 h-6 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"/>
            Sélectionnez votre Parcours
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Major Select */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-hover:text-blue-400 transition-colors">Filière</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none transition-all cursor-pointer hover:bg-slate-800/50"
                  value={selectedMajor}
                  onChange={(e) => handleContextChange('major', e.target.value)}
                >
                  <option value="">Choisir la Filière...</option>
                  {majors.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Year Select */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-hover:text-blue-400 transition-colors">Année / Niveau</label>
              <div className="relative">
                <select 
                  className="w-full appearance-none bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer hover:bg-slate-800/50"
                  value={selectedYear}
                  onChange={(e) => handleContextChange('year', e.target.value)}
                  disabled={!selectedMajor}
                >
                  <option value="">Choisir l'Année...</option>
                  {years.map(y => <option key={y} value={y}>Année {y}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Semester Select */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-400 mb-2 group-hover:text-blue-400 transition-colors">Semestre</label>
              <div className="relative">
                 <select 
                  className="w-full appearance-none bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer hover:bg-slate-800/50"
                  value={selectedSemester}
                  onChange={(e) => handleContextChange('semester', e.target.value)}
                  disabled={!selectedYear}
                >
                  <option value="">Choisir le Semestre...</option>
                  {semesters.map(s => <option key={s} value={s}>Semestre {s}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects List */}
        {subjects.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-6 gap-4 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      {selectedMajor}{selectedYear} <span className="text-slate-600">/</span> Semestre {selectedSemester}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Personnalisez les coefficients ou les types d'examen si nécessaire.</p>
                </div>
                <button 
                  onClick={() => { setMarks({}); setShowResults(false); }}
                  className="text-sm px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all border border-rose-500/20 font-medium flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  Réinitialiser Notes
                </button>
             </div>
             
             <div className="space-y-4">
               {subjects.map((subject, idx) => (
                 <div key={subject.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards">
                    <SubjectRow 
                        subject={subject}
                        marks={marks[subject.id] || {}}
                        onMarkChange={(label, val) => handleMarkChange(subject.id, label, val)}
                        onUpdateSubject={handleSubjectUpdate}
                        calculatedAverage={showResults ? calculateSubjectAverage(subject) : undefined}
                    />
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            </div>
            <p className="text-lg font-medium">{selectedSemester ? "Aucune matière trouvée." : "Commencez par sélectionner votre parcours."}</p>
            <p className="text-sm mt-2 opacity-60">Utilisez les filtres ci-dessus pour afficher les matières.</p>
          </div>
        )}
      </main>

      {/* Calculate Button Sticky Footer */}
      {subjects.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800 p-4 shadow-2xl z-40 supports-[backdrop-filter]:bg-slate-900/60 pb-8 sm:pb-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
             <div className="hidden md:flex flex-col">
               <span className="text-slate-300 text-sm font-medium">Prêt à calculer ?</span>
               <span className="text-slate-500 text-xs">Assurez-vous d'avoir rempli toutes les notes.</span>
             </div>
             <button
               onClick={() => setShowResults(true)}
               className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-lg flex items-center justify-center gap-2"
             >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
               Calculer la Moyenne
             </button>
          </div>
        </div>
      )}

      {/* Copyright Footer */}
      <footer className="text-center py-6 text-slate-600 text-xs relative z-0 mt-8 mb-16 sm:mb-0">
        <p>&copy; {new Date().getFullYear()} Brimo. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default App;
