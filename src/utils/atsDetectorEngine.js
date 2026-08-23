/**
 * ATS Detector Engine
 * Analyzes Job Description text, URLs, or company keywords to identify the ATS system
 * and provide specialized parsing guidelines.
 */

export const KNOWN_ATS_SYSTEMS = [
  {
    id: 'greenhouse',
    name: 'Greenhouse ATS',
    confidence: 'High',
    badgeColor: 'emerald',
    description: 'Modern developer-friendly ATS heavily favored by tech unicorns & startups.',
    signatureMatches: ['boards.greenhouse.io', 'greenhouse.io', 'gh_jid', 'greenhouse job board', 'greenhouse software'],
    parsingStrengths: ['Accurate PDF & DOCX parsing', 'Extracts GitHub & portfolio links seamlessly', 'Good header recognition'],
    gotchas: [
      'Strips complex multi-column layouts into merged text blocks.',
      'Graphics, logos, and custom skill meter bars are discarded.',
      'Prefers standard Section Titles: "Experience", "Skills", "Education".'
    ],
    recommendedFormat: 'Standard single-column chronological format with standard bullet points.'
  },
  {
    id: 'workday',
    name: 'Workday Recruiting',
    confidence: 'High',
    badgeColor: 'cyan',
    description: 'Enterprise HCM platform used by Fortune 500 companies (Amazon, Google, Walmart, etc.).',
    signatureMatches: ['myworkdayjobs.com', 'workday', 'wd1.myworkday', 'wd3.myworkday', 'workday hcm'],
    parsingStrengths: ['Standardized field autofill from resumes', 'Strict date-range tracking'],
    gotchas: [
      'Very strict parsing on tables, multi-column templates, and headers/footers.',
      'Text inside text boxes is frequently skipped completely.',
      'Requires explicit mm/yyyy or yyyy date ranges for experience calculation.'
    ],
    recommendedFormat: 'Simple clean text layout without tables or text boxes; explicitly format dates as MM/YYYY - MM/YYYY.'
  },
  {
    id: 'lever',
    name: 'Lever ATS',
    confidence: 'High',
    badgeColor: 'violet',
    description: 'Candidate-relationship focused ATS popular in high-growth software companies.',
    signatureMatches: ['jobs.lever.co', 'lever.co', 'lever application', 'powered by lever'],
    parsingStrengths: ['Great full-text keyword indexing', 'Parses skills directly into recruiter search filters'],
    gotchas: [
      'Unusual section names (e.g., "What I Do") may cause experiences to be misplaced.',
      'Scans heavily for exact skill match tokens in the first 2 pages.'
    ],
    recommendedFormat: 'Exact keyword matching with dedicated Skills block near top or bottom.'
  },
  {
    id: 'ashby',
    name: 'Ashby HQ',
    confidence: 'High',
    badgeColor: 'pink',
    description: 'Next-gen, hyper-fast hiring platform popular among modern tech & AI startups.',
    signatureMatches: ['jobs.ashbyhq.com', 'ashbyhq.com', 'ashby app', 'ashby tracking'],
    parsingStrengths: ['Modern semantic parsing', 'Understands context and equivalent synonyms (e.g. TS = TypeScript)'],
    gotchas: [
      'Fast automated pre-screening filters based on core requirement years of experience.',
      'Keep your summary punchy and numbers obvious.'
    ],
    recommendedFormat: 'Modern, clean single or two-column resume with explicit impact numbers.'
  },
  {
    id: 'taleo',
    name: 'Oracle Taleo',
    confidence: 'Moderate',
    badgeColor: 'amber',
    description: 'Legacy enterprise ATS used by defense, healthcare, government, and legacy banking.',
    signatureMatches: ['taleo.net', 'oracle taleo', 'taleo enterprise', 'taleo recruiting'],
    parsingStrengths: ['Handles plain ASCII text with extreme reliability'],
    gotchas: [
      'Highly sensitive to complex fonts, glyphs, tables, and special symbol bullets.',
      'PDFs with non-standard font encodings can produce garbled text.',
      'Heavily relies on exact keyword string matching rather than semantic synonyms.'
    ],
    recommendedFormat: 'Plain text or ultra-clean PDF with standard bullet symbols (• or -) and standard web fonts.'
  },
  {
    id: 'icims',
    name: 'iCIMS Talent Cloud',
    confidence: 'Moderate',
    badgeColor: 'cyan',
    description: 'Large enterprise recruitment platform widely used in retail, healthcare, and enterprise tech.',
    signatureMatches: ['icims.com', 'careers-icims', 'jobs-icims', 'powered by icims'],
    parsingStrengths: ['Strong OCR capabilities for document parsing'],
    gotchas: [
      'Multi-column sidebars often get read out of chronological order.',
      'Ensure your job title and dates appear on clear distinct lines.'
    ],
    recommendedFormat: 'Strict linear top-to-bottom layout with clear job titles on dedicated lines.'
  },
  {
    id: 'smartrecruiters',
    name: 'SmartRecruiters',
    confidence: 'Moderate',
    badgeColor: 'emerald',
    description: 'Global enterprise hiring suite used by companies like LinkedIn, Visa, and Skechers.',
    signatureMatches: ['smartrecruiters.com', 'jobs.smartrecruiters', 'smartprofile'],
    parsingStrengths: ['Smart candidate skill scoring and social profile matching'],
    gotchas: [
      'Extracts LinkedIn and public profile links first for social validation.',
      'Ensure summary contains primary target job title.'
    ],
    recommendedFormat: 'Include direct LinkedIn URL and exact matching job title.'
  }
];

export const DEFAULT_ATS = {
  id: 'universal',
  name: 'Universal Modern ATS',
  confidence: 'Standard',
  badgeColor: 'cyan',
  description: 'General modern ATS guidelines compatible with 99% of online application portals.',
  signatureMatches: [],
  parsingStrengths: ['Compatible with standard PDF and DOCX documents', 'Parses recognized skill keywords'],
  gotchas: [
    'Avoid embedded graphics, icons representing skill bars, and nested tables.',
    'Use standard font families (Inter, Roboto, Arial, Helvetica, Calibri, Georgia).',
    'Include direct email, phone, and LinkedIn URL.'
  ],
  recommendedFormat: 'Clean single-column layout with high contrast, standard bullet points, and quantified accomplishments.'
};

/**
 * Detects ATS from Job Description text, URLs, or hints
 */
export function detectAtsSystem(text = '', urlHint = '') {
  const combined = `${text} ${urlHint}`.toLowerCase();

  for (const ats of KNOWN_ATS_SYSTEMS) {
    const isMatched = ats.signatureMatches.some(signature => combined.includes(signature.toLowerCase()));
    if (isMatched) {
      return ats;
    }
  }

  // Keyword heuristic search
  if (combined.includes('greenhouse')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'greenhouse');
  if (combined.includes('workday')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'workday');
  if (combined.includes('lever')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'lever');
  if (combined.includes('ashby')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'ashby');
  if (combined.includes('taleo')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'taleo');
  if (combined.includes('icims')) return KNOWN_ATS_SYSTEMS.find(a => a.id === 'icims');

  return DEFAULT_ATS;
}
