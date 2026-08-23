/**
 * Google XYZ Formula & Bullet Impact Scorer Engine
 * Formula: "Accomplished [X] as measured by [Y], by doing [Z]"
 */

export const POWER_ACTION_VERBS = [
  'architected', 'spearheaded', 'orchestrated', 'engineered', 'streamlined', 'pioneered',
  'accelerated', 'transformed', 'maximized', 'optimized', 'scaled', 'implemented',
  'executed', 'deployed', 'overhauled', 'boosted', 'generated', 'cultivated', 'established',
  'formulated', 'delivered', 'automated', 'modernized', 'expanded', 'revamped', 'consolidated'
];

export const WEAK_PASSIVE_PHRASES = [
  'responsible for', 'duties included', 'helped with', 'assisted with', 'worked on',
  'participated in', 'tasked with', 'handled', 'was involved in', 'contributed to',
  'supported the', 'tried to', 'served as', 'took care of'
];

export const METRIC_PATTERNS = [
  /(\d+[\d,.]*\s*%\s*)/i,                               // percentages: 35%, 12.5%
  /(\$\s*\d+[\d,.]*\s*(?:k|m|b|million|billion|thousand)?)/i, // money: $1.2M, $50k
  /(\b\d+[\d,.]*\s*(?:k|m|million|billion|users|clients|customers|requests|transactions|tps|qps|endpoints|engineers|members|students)\b)/i, // volume
  /(\b\d+x\b)/i,                                         // multipliers: 3x, 10x
  /(\breduced\s+[\w\s]+\s+by\s+\d+)/i,                   // reduction
  /(\bincreased\s+[\w\s]+\s+by\s+\d+)/i,                 // increase
  /(\bfrom\s+\d+[\w%]*\s+to\s+\d+[\w%]*\b)/i             // from A to B
];

/**
 * Evaluates a single bullet point or block of bullets
 */
export function scoreBulletPoint(bulletText = '') {
  const text = bulletText.trim().replace(/^[-•*]\s*/, '');
  if (!text) {
    return {
      score: 0,
      hasPowerVerb: false,
      hasMetric: false,
      hasXyzFormula: false,
      hasPassiveVoice: false,
      feedback: ['Please enter a bullet point to analyze.'],
      metricsDetected: [],
      rewrites: []
    };
  }

  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);
  const firstWord = words[0] || '';

  // 1. Power Verb Check
  const hasPowerVerb = POWER_ACTION_VERBS.some(verb => lower.startsWith(verb) || words.slice(0, 3).includes(verb));
  
  // 2. Passive Phrase Check
  const detectedWeakPhrase = WEAK_PASSIVE_PHRASES.find(phrase => lower.includes(phrase));
  const hasPassiveVoice = Boolean(detectedWeakPhrase);

  // 3. Metric Detection
  const metricsDetected = [];
  METRIC_PATTERNS.forEach(regex => {
    const match = text.match(regex);
    if (match) metricsDetected.push(match[0]);
  });
  const hasMetric = metricsDetected.length > 0;

  // 4. XYZ Formula Structural Analysis
  // Checks for Accomplishment (X), Measurement (Y), Action/Method (Z)
  const hasDoingConnector = /\b(by|via|through|utilizing|leveraging|using|implementing|architecting)\b/i.test(text);
  const hasXyzFormula = hasPowerVerb && hasMetric && (hasDoingConnector || words.length >= 12);

  // Calculate score
  let score = 40;
  const feedback = [];

  if (hasPowerVerb) {
    score += 25;
    feedback.push('Starts with a decisive, high-impact action verb.');
  } else if (!hasPassiveVoice) {
    score += 10;
    feedback.push('Consider starting with an authoritative power verb (e.g., "Architected", "Spearheaded").');
  }

  if (hasPassiveVoice) {
    score -= 20;
    feedback.push(`Contains passive phrase "${detectedWeakPhrase}". Eliminate duties-oriented phrasing.`);
  }

  if (hasMetric) {
    score += 25;
    feedback.push(`Great quantification (${metricsDetected.slice(0, 2).join(', ')}).`);
  } else {
    score -= 15;
    feedback.push('Missing measurable outcome. Add % growth, dollar amounts, time saved, or user scale.');
  }

  if (hasXyzFormula) {
    score += 10;
    feedback.push('Aligns cleanly with Google\'s XYZ Formula (Accomplished X as measured by Y, by doing Z).');
  }

  // Length sanity
  if (words.length < 8) {
    score -= 10;
    feedback.push('Bullet is too brief. Elaborate on the exact technology and business impact.');
  } else if (words.length > 38) {
    score -= 5;
    feedback.push('Bullet is slightly wordy. Consider trimming filler words to improve readability.');
  }

  const finalScore = Math.max(15, Math.min(98, score));
  const rewrites = generateAiRewrites(text, hasMetric, detectedWeakPhrase);

  return {
    score: finalScore,
    originalText: text,
    hasPowerVerb,
    hasMetric,
    hasXyzFormula,
    hasPassiveVoice,
    detectedWeakPhrase,
    metricsDetected: Array.from(new Set(metricsDetected)),
    wordCount: words.length,
    feedback,
    rewrites
  };
}

/**
 * Generates 3 quantified, XYZ-compliant variations of the bullet point
 */
export function generateAiRewrites(rawBullet = '', hasMetric = false, weakPhrase = '') {
  let cleaned = rawBullet.trim().replace(/^[-•*]\s*/, '');
  if (!cleaned) return [];

  // Remove weak prefixes if present
  if (weakPhrase) {
    const regex = new RegExp(`^${weakPhrase}\\s*`, 'i');
    cleaned = cleaned.replace(regex, '');
  }

  const sampleMetricA = hasMetric ? '' : ', resulting in a 34% reduction in processing overhead';
  const sampleMetricB = hasMetric ? '' : ', scaling platform throughput to 100k+ daily transactions';
  const sampleMetricC = hasMetric ? '' : ', generating an estimated $180K in annual operational savings';

  return [
    {
      id: 'variation-1',
      tone: 'High-Impact Engineering',
      icon: 'zap',
      text: `Architected and deployed ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}${sampleMetricA} by implementing modular CI/CD and caching layers.`,
      highlight: 'Emphasizes architectural leadership & concrete efficiency gains.'
    },
    {
      id: 'variation-2',
      tone: 'Scale & Growth Focused',
      icon: 'trending-up',
      text: `Spearheaded end-to-end execution of ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}${sampleMetricB} through cross-functional collaboration and modern API design.`,
      highlight: 'Focuses on team velocity, scalability, and measurable throughput.'
    },
    {
      id: 'variation-3',
      tone: 'Executive & Business Value',
      icon: 'award',
      text: `Streamlined business-critical workflows for ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}${sampleMetricC}, boosting team productivity and client retention.`,
      highlight: 'Highlights bottom-line business revenue impact and stakeholder value.'
    }
  ];
}

// Sample presets for quick testing
export const SAMPLE_BULLETS = [
  {
    type: 'weak',
    label: 'Weak / Passive Bullet (Score: ~35)',
    text: 'Responsible for building web features in React and helping the team fix bugs.'
  },
  {
    type: 'moderate',
    label: 'Moderate Bullet (Score: ~65)',
    text: 'Developed customer dashboard using React and Node.js, improving page speed.'
  },
  {
    type: 'strong',
    label: 'Google XYZ Master Bullet (Score: ~95)',
    text: 'Architected responsive analytics dashboard using React and TypeScript, boosting customer conversion by 38% and reducing bundle load time by 1.4s for 450k active users.'
  }
];
