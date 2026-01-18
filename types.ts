export type EvaluationType = 
  | 'DS_EXAM' 
  | 'DS_EXAM_TP' 
  | 'EXAM_TP' 
  | 'CONTINUOUS_3' // For DS1 + DS2 + ORAL/TP
  | 'CONTINUOUS_2' // For DS + TP (No Exam) or DS1 + DS2
  | 'DS_EXAM_TP_MIXED'; // Generic fallback if needed

export interface Subject {
  id: string;
  name: string;
  coef: number;
  type: EvaluationType;
  inputs: string[]; // Labels for inputs e.g., ['DS', 'Examen']
}

export interface SemesterData {
  subjects: Subject[];
}

export interface YearData {
  [semester: string]: SemesterData;
}

export interface MajorData {
  [year: string]: YearData;
}

export interface UniversityData {
  [major: string]: MajorData;
}

export interface GradeMap {
  [subjectId: string]: {
    [inputLabel: string]: string; // Keeping as string to handle empty inputs
  };
}
