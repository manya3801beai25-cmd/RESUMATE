// Bullet-Point Impact Scorer & Metric Fixer Engine

export const POWER_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Accelerated', 'Streamlined', 'Deployed',
  'Orchestrated', 'Optimized', 'Automated', 'Revamped', 'Pioneered', 'Scaled',
  'Constructed', 'Formulated', 'Innovated', 'Boosted', 'Elevated', 'Overhauled',
  'Designed', 'Implemented', 'Authored', 'Centralized', 'Decreased', 'Maximized',
  'Mitigated', 'Negotiated', 'Consolidated', 'Launched', 'Supervised', 'Executed',
  'Mentored', 'Championed', 'Transformed', 'Delivered', 'Resolved'
];

export const POWER_VERB_CATEGORIES = {
  engineering: {
    label: 'Engineering & Architecture',
    icon: 'Terminal',
    verbs: ['Architected', 'Engineered', 'Deployed', 'Automated', 'Implemented', 'Designed', 'Constructed', 'Centralized']
  },
  leadership: {
    label: 'Leadership & Strategy',
    icon: 'Crown',
    verbs: ['Spearheaded', 'Orchestrated', 'Supervised', 'Negotiated', 'Pioneered', 'Launched', 'Executed', 'Mentored', 'Championed']
  },
  performance: {
    label: 'Performance & Optimization',
    icon: 'TrendingUp',
    verbs: ['Accelerated', 'Streamlined', 'Optimized', 'Scaled', 'Boosted', 'Maximized', 'Decreased', 'Mitigated']
  },
  innovation: {
    label: 'Innovation & Modernization',
    icon: 'Sparkles',
    verbs: ['Revamped', 'Overhauled', 'Formulated', 'Innovated', 'Authored', 'Consolidated', 'Transformed', 'Delivered']
  }
};

export const WEAK_PHRASES = [
  'responsible for', 'worked on', 'helped with', 'assisted in', 'duties included',
  'handled', 'took part in', 'participated in', 'tasked with', 'aided with', 'attempted to',
  'involved in', 'dealt with'
];

export const SAMPLE_BULLETS = [
  {
    id: 'b1',
    label: 'Frontend / Web UI (Weak)',
    category: 'Frontend',
    text: 'Responsible for fixing bugs and updating web UI components in React and CSS.'
  },
  {
    id: 'b2',
    label: 'Backend & APIs (Weak)',
    category: 'Backend',
    text: 'Worked on backend REST APIs using Node.js, Express, and PostgreSQL database.'
  },
  {
    id: 'b3',
    label: 'DevOps / Cloud (Weak)',
    category: 'DevOps',
    text: 'Helped with deployment pipelines and assisted team in maintaining AWS EC2 servers.'
  },
  {
    id: 'b4',
    label: 'Data & Analytics (Weak)',
    category: 'Data',
    text: 'Assisted team in analyzing customer transaction data using Python and Excel.'
  },
  {
    id: 'b5',
    label: 'High Impact Example (Good)',
    category: 'Benchmark',
    text: 'Architected distributed caching with Redis, reducing API latency by 45ms and supporting 250k daily active users.'
  }
];

export function analyzeBullet(bulletText = '') {
  const text = bulletText.trim();
  if (!text) {
    return null;
  }

  const words = text.split(/\s+/);
  const lower = text.toLowerCase();

  const firstWord = words[0]?.replace(/[^a-zA-Z]/g, '');
  const startsWithPowerVerb = POWER_VERBS.some(v => v.toLowerCase() === firstWord?.toLowerCase());
  const containsAnyPowerVerb = POWER_VERBS.some(v => new RegExp(`\\b${v}\\b`, 'i').test(text));

  const foundWeakPhrases = WEAK_PHRASES.filter(wp => lower.includes(wp));

  const metricRegex = /(\d+[\%kKmMbB]?|\$\d+[\d,]*|\b\d+\b|\b\d+x\b|\b\d+ms\b|\b\d+\s*(percent|hours|users|customers|million|billion|k|seconds|ms))/i;
  const hasMetrics = metricRegex.test(text);
  const metricMatches = text.match(/(\$\d+[\d,]*|\d+[\%kKmMbB]?|\b\d+x\b|\b\d+\s*(percent|users|ms|hours|seconds))/gi) || [];

  const wordCount = words.length;
  let lengthStatus = 'ideal';
  if (wordCount < 8) lengthStatus = 'too_short';
  else if (wordCount > 35) lengthStatus = 'too_long';

  const hasOutcome = /(resulting in|increasing|reducing|saving|driving|delivering|yielding|cutting|boosting|generating|achieving)/i.test(text);
  const hasMethod = /(by|using|utilizing|leveraging|through|implementing|via|building|deploying)/i.test(text);
  const adheresToXYZ = (hasMetrics || hasOutcome) && (hasMethod || startsWithPowerVerb);

  let score = 45;
  if (startsWithPowerVerb) score += 25;
  else if (containsAnyPowerVerb) score += 12;

  if (hasMetrics) score += 25;
  if (hasOutcome) score += 10;
  if (hasMethod) score += 5;
  
  if (foundWeakPhrases.length > 0) score -= (foundWeakPhrases.length * 15);
  if (lengthStatus === 'too_short') score -= 15;
  if (lengthStatus === 'too_long') score -= 10;

  score = Math.max(10, Math.min(100, score));

  let grade = 'Needs Work';
  let gradeColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  if (score >= 85) {
    grade = 'Elite Impact';
    gradeColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (score >= 70) {
    grade = 'Strong Bullet';
    gradeColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
  } else if (score >= 50) {
    grade = 'Moderate Impact';
    gradeColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  }

  const aiRewrites = generateBulletRewrites(text, startsWithPowerVerb ? firstWord : 'Engineered');

  return {
    text,
    score,
    grade,
    gradeColor,
    wordCount,
    lengthStatus,
    startsWithPowerVerb,
    firstWord,
    containsAnyPowerVerb,
    foundWeakPhrases,
    hasMetrics,
    metricMatches,
    adheresToXYZ,
    hasOutcome,
    hasMethod,
    aiRewrites
  };
}

export function generateBulletRewrites(originalText, baseVerb = 'Engineered') {
  let coreText = originalText.replace(/^(•|-|\*)\s*/, '');
  WEAK_PHRASES.forEach(wp => {
    const reg = new RegExp(`\\b${wp}\\b`, 'gi');
    coreText = coreText.replace(reg, '');
  });
  coreText = coreText.trim();
  if (!coreText) coreText = 'high-performance systems and web architecture';

  const sanitized = coreText.charAt(0).toLowerCase() + coreText.slice(1);

  // Extract any key technical terms mentioned
  const isFrontend = /react|vue|angular|css|tailwind|html|ui|ux|frontend/i.test(originalText);
  const isBackend = /node|express|api|database|sql|postgres|mongo|backend|redis/i.test(originalText);
  const isCloud = /aws|docker|kubernetes|cloud|devops|ci\/cd|pipeline/i.test(originalText);
  const isData = /python|data|analysis|excel|ml|machine learning|analytics/i.test(originalText);

  let metricVariant = `Architected and deployed modern solutions for ${sanitized}, boosting performance by 34% and cutting latency by 45ms across 100K+ active users.`;
  let leadershipVariant = `Spearheaded cross-functional initiative for ${sanitized}, reducing operational bottlenecks by $65,000 annually while accelerating release velocity by 2.5x.`;
  let precisionVariant = `Engineered end-to-end architecture for ${sanitized} leveraging industry best practices, achieving 99.98% uptime and eliminating manual regressions.`;

  if (isFrontend) {
    metricVariant = `Architected responsive, accessible UI modules for ${sanitized}, improving Lighthouse score from 68 to 98 and cutting page load time by 42%.`;
    leadershipVariant = `Spearheaded component library overhaul for ${sanitized}, accelerating sprint delivery speed by 35% across 4 cross-functional product teams.`;
    precisionVariant = `Engineered modular React architecture for ${sanitized} with automated Jest test suites, achieving 95% test coverage and zero UI regressions.`;
  } else if (isBackend) {
    metricVariant = `Engineered scalable REST microservices for ${sanitized}, reducing database query latency by 58% and supporting 300K+ daily requests.`;
    leadershipVariant = `Orchestrated backend pipeline migration for ${sanitized}, cutting cloud server costs by 28% and ensuring compliance with enterprise SLA standards.`;
    precisionVariant = `Architected high-throughput service layer for ${sanitized} utilizing connection pooling and Redis caching, achieving sub-30ms response times.`;
  } else if (isCloud) {
    metricVariant = `Automated end-to-end CI/CD deployment pipelines for ${sanitized}, reducing release deployment cycles from 4 hours to 12 minutes.`;
    leadershipVariant = `Pioneered containerized cloud infrastructure for ${sanitized}, lowering monthly AWS infrastructure expenditure by $42,000.`;
    precisionVariant = `Configured self-healing Kubernetes clusters for ${sanitized} with automated alerting, maintaining 99.99% system availability.`;
  } else if (isData) {
    metricVariant = `Constructed automated data processing workflows for ${sanitized}, processing 2M+ records daily with 4x faster execution throughput.`;
    leadershipVariant = `Delivered executive business intelligence models for ${sanitized}, identifying $120,000 in revenue optimization opportunities.`;
    precisionVariant = `Formulated optimized Python ETL pipelines for ${sanitized}, eliminating data discrepancies and achieving 99.8% data integrity.`;
  }

  return [
    {
      id: 'metric_focused',
      title: 'Metrics & Performance Focused (Recommended)',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      bullet: metricVariant,
      formula: 'Accomplished [X] measured by [Y] by doing [Z]',
      tags: ['Quantified Impact', 'Speed/Efficiency', 'XYZ Formula']
    },
    {
      id: 'executive_leadership',
      title: 'Executive & Strategic Impact',
      tagColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      bullet: leadershipVariant,
      formula: 'Spearheaded [Initiative] driving [Business ROI]',
      tags: ['Cost / Revenue', 'Delivery Velocity', 'Leadership']
    },
    {
      id: 'streamlined_concise',
      title: 'Concise & Technical Precision',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      bullet: precisionVariant,
      formula: 'Engineered [System] with [Quality & Reliability]',
      tags: ['99.9%+ Reliability', 'Zero Regressions', 'Best Practices']
    }
  ];
}

export function analyzeAllBullets(fullText = '') {
  if (!fullText) return [];
  const lines = fullText.split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*') || (l.length > 25 && /^[A-Z]/.test(l)));

  return lines.slice(0, 8).map(line => analyzeBullet(line)).filter(Boolean);
}
