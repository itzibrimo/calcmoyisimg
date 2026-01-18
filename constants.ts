import { UniversityData, Subject, EvaluationType } from './types';

// Helper to create subjects easily
const createSubject = (name: string, coef: number, type: EvaluationType, inputs: string[]): Subject => ({
  id: `${name.replace(/\s+/g, '_')}_${Math.random().toString(36).substr(2, 9)}`,
  name,
  coef,
  type,
  inputs
});

// Input configurations
const IN_DS_EX = ['DS', 'Examen'];
const IN_DS_EX_TP = ['DS', 'Examen', 'TP'];
const IN_EX_TP = ['Examen', 'TP'];
const IN_3_CC = ['DS1', 'DS2', 'Oral/TP']; // Continuous Control 3 inputs
const IN_2_CC = ['DS', 'TP']; // Continuous Control 2 inputs (or DS1, DS2)

export const DATA: UniversityData = {
  LAM: {
    '1': {
      '1': {
        subjects: [
          createSubject("Fondements théorique du multimédia (1)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Algorithme", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Généralités informatiques", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Introduction à la communication multimédia (1)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Concepts et outils pour le web 1", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Eléments fondamentaux de la musique (1)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Technologies et outils de création (1)", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Techniques expression 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Activités Pratiques", 2, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences linguistiques 1 (anglais 1)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences digitales (c2i)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Fondements théorique du multimédia (2)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Algorithmique et programmation", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Concepts et outils pour le web (2)", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Technologie et outils de création (2)", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Introduction à la communication multimédia (2)", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Eléments fondamentaux de la musique (2)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Synthèse graphique", 2, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques expression 2 (dessin analytique)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences digitales 2", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de Communication 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences linguistiques 2 (anglais 2)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    },
    '2': {
      '1': {
        subjects: [
          createSubject("Intégration web avancée", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Méthodologie de création multimédia", 2, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Introduction aux Bases de Données", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Initiation à la conception orientée objet", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Technologies web", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Techniques d'animation 2d et interactivité", 2, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Modélisation 3d (1)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences linguistiques 3 (anglais 3)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Activité entrepreneuriale (marketing)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Montage image et son", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Photographie numérique", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Prise de vue", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Conception graphique de produit Multimédia", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Développement de produit Multimédia", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Animation 3d", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Modélisation 3d (2)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Effets spéciaux", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Système de gestion de base de données", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Web Dynamique 1", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Compétences linguistiques (anglais (4))", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Activité entrepreneuriale (entreprenariat)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Réalité virtuelle", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Réalité augmentée", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    },
    '3': {
      '1': {
        subjects: [
          createSubject("Développement d'application multimédia (design)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Développement d'application multimédia (technique)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Animation 3d avancée", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Programmation 3d", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Nouvelles technologies web", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Conduite de projet multimédia", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Compétences linguistiques (anglais (5))", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Activité entrepreneuriale (marketing digital)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Game design", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Storyboard", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Programmation IA", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    }
  },
  LTIC: {
    '1': {
      '1': {
        subjects: [
          createSubject("Analyse 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Algèbre 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Electrostatique et magnétostatique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Mécanique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes d'exploitation", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Algorithmique et programmation", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Electronique numérique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Circuits electriques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 1", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("C2i 1", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Analyse 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Algèbre 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Electromagnétisme", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Thermodynamique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation avancée", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Base de données", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Electronique analogique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fonctions d'electronique numérique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 2", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("C2i 2", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      }
    },
    '2': {
      '1': {
        subjects: [
          createSubject("Automatique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Instrumentation et métrologie", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Traitement du signal analogique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Transmission des données", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fonctions d'electronique analogique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Architecture des microprocesseurs et microcontrôleurs", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Physique des semi-conducteurs", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Programmation en assembleur", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Anglais 3", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Culture entrepreneuriale", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Traitement d'images et segmentation", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Acquisition et traitement des données multimédia", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Traitement du signal numérique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Transmission des signaux analogiques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Théorie de l'information", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Traitement des signaux aléatoires", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Communication mobile", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Voix et vidéo sur IP", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 4", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Gestion de projets (approche agile)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    },
    '3': {
      '1': {
        subjects: [
          createSubject("Traitement de la parole et du son", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Compression de l'image et de la vidéo", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Transmission des signaux numériques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Modulations numériques avancées", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Traitement du signal temps réel", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes sur puce : programmation avancée", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 5: certification TOEFL - TOEIC", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Compétences entrepreneuriales", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Programmation Python Matlab", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Fondements de réseaux", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      }
    }
  },
  LISI: {
    '1': {
      '1': {
        subjects: [
          createSubject("Algèbre 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Electricité-electronique", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Propagation et rayonnement", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Système d'exploitation 1", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes logiques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Algorithmique et structure des données", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier programmation 1", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
          createSubject("Anglais 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Algèbre 2", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 2", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Fonctions electronique", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Initiation au traitement du signal", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Architecture des ordinateurs", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Transmission de données", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Algorithmitique, structure des données et complexité", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier programmation 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
          createSubject("Systèmes d'exploitation 2", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Culture et compétences numériques", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      }
    },
    '2': {
      '1': {
        subjects: [
          createSubject("Graphes et optimisation", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Probabilité statistique", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Automates programmables", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Technologies multimédia", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Méthodologie de conception de logiciel", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Fondements des bases de données", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation orientée objet", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation Python", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 3", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Gestion d'entreprise", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Automatique", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Architecture avancée des processeurs", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      },
      '2': {
        subjects: [
          createSubject("Programmation web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Développement mobile", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Conception des circuits logiques & synthèse vhdl", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Système sur puce (SoC) & Technologies d'interfaçage", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Test logiciel (certification ISTQB)", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Sécurité Informatique", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 4", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Droit informatique, protection des données et éthique", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Projet fédéré (méthode agile)", 1.5, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Robotique", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Réseaux locaux Industriels", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      }
    },
    '3': {
      '1': {
        subjects: [
          createSubject("IA et machine learning", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Big data", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Architecture IoT", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Sécurité IoT", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Technologie des réseaux sans fil pour l'IoT", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Cloud et VIrtualisation", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Conception d'objets connectés (Co-design)", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes temps réel", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 5", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Entreprenariat", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Préparation à l'environnement professionnel", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("IoT & energies renouvelables", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation pour cible embarqué", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      }
    }
  },
  LSIM: {
    '1': {
      '1': {
        subjects: [
          createSubject("Algèbre 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Algorithmique et structure de données", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier programmation 1", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Système d'exploitation 1", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes logiques & architecture des ordinateurs", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Logique formelle", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Technologies multimédias", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Algèbre 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Algoritmique, structure de données et complexité", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier de programmation 2", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation python", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Système d'exploitation 2", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fondements des réseaux", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fondements des bases de données", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Anglais 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Culture et compétences numériques", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      }
    },
    '2': {
      '1': {
        subjects: [
          createSubject("Probabilité et statistique", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Théorie des langages et des automates", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Graphes et optimisation", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Conception des systèmes d'information", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Programmation java", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Ingénierie des bases de données", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Services des réseaux", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 3", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Gestion d'entreprise", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Web design", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Animation 2d", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      },
      '2': {
        subjects: [
          createSubject("Numérisation et codage des objets multimedia", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Traitement d'images numériques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Infographie", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Technologies et programmation web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Développement d'applications mobiles", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fondements & programmation ia", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Tests de logiciels (certification istqb)", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 4", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Droit informatique, protection des données et éthique", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Projet féderé (méthodo agile)", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
          createSubject("Architecture web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Développement cross-plateforme d'une application desktop", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      }
    },
    '3': {
      '1': {
        subjects: [
          createSubject("Framework & technologies big data", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Virtualisation et cloud", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Architecture soa et service web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Techniques d'indexation et de référencement", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Réalité virtuelle et réalité augmentée", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Maillage 2D-3D", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Développement d'applications web et multimédia(J2EE, .NET..)", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Anglais 5", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Entreprenariat", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Préparation à l'environnement professionnel", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Sécurité web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Machine Learning", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
        ]
      }
    }
  },
  CPI: {
    '1': {
      '1': {
        subjects: [
          createSubject("Algèbre 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 1", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Algorithme et structure des données", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier programmation i", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Système d'exploitation 1", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Circuits electriques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Systèmes logiques", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Optique", 1.25, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Electrostatique-magnétostatique", 1.25, 'DS_EXAM', IN_DS_EX),
          createSubject("Anglais 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("2CN", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Algèbre 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 2", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("algorithmes, structure des données et complexité", 2, 'DS_EXAM', IN_DS_EX),
          createSubject("Atelier programmation 2", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Programmation Python", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Traitement du Signal", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Architecture des calculateurs", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Electronique", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Electromagnétisme", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Anglais 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    },
    '2': {
      '1': {
        subjects: [
          createSubject("Algèbre 3", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Analyse 3", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Base de données 1", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Théorie des langages", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Programmation OO Java", 2, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Atelier C++", 1, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Système d’exploitation 2", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Fondements des réseaux", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Transmission des données", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("TOEIC1", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Web statique", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'TP']),
        ]
      },
      '2': {
        subjects: [
          createSubject("Probabilité et statistiques", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Théorie des graphes", 1.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Programmation java 2", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Conception Orientée Objet", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Logique formelle", 0.5, 'DS_EXAM', IN_DS_EX),
          createSubject("Compilation", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Programmation web", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("BD Avancée", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("Technologies Multimédia", 1, 'DS_EXAM', IN_DS_EX),
          createSubject("Services Réseaux", 1.5, 'DS_EXAM_TP', IN_DS_EX_TP),
          createSubject("TOEIC2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
          createSubject("Techniques de communication 2", 1, 'CONTINUOUS_3', ['DS1', 'DS2', 'Oral']),
        ]
      }
    }
  }
};
