/**
 * Salary & Role Insights Predictor Engine
 */

export const ROLE_BENCHMARKS = {
  'Senior Full Stack Engineer': {
    min: 145000,
    median: 178000,
    max: 225000,
    growthRate: '+14% YoY',
    topTech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    demandLevel: 'Very High',
    description: 'High market demand for engineers capable of owning end-to-end features and cloud deployments.'
  },
  'Senior Frontend Engineer': {
    min: 140000,
    median: 168000,
    max: 210000,
    growthRate: '+12% YoY',
    topTech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Performance'],
    demandLevel: 'High',
    description: 'Strong demand for performance-focused UI engineers and design systems leaders.'
  },
  'Senior Backend Engineer': {
    min: 150000,
    median: 182000,
    max: 235000,
    growthRate: '+16% YoY',
    topTech: ['Node.js', 'Go', 'Python', 'Kubernetes', 'PostgreSQL', 'Kafka'],
    demandLevel: 'Very High',
    description: 'Extreme demand for distributed systems, concurrency, and high-throughput data pipelines.'
  },
  'AI / ML Engineer': {
    min: 165000,
    median: 205000,
    max: 275000,
    growthRate: '+38% YoY',
    topTech: ['Python', 'PyTorch', 'LLMs', 'RAG', 'LangChain', 'Vector DBs', 'FastAPI'],
    demandLevel: 'Explosive',
    description: 'Highest compensation growth across the industry with premium for generative AI and LLM operationalization.'
  },
  'Senior Product Manager': {
    min: 145000,
    median: 175000,
    max: 220000,
    growthRate: '+10% YoY',
    topTech: ['Roadmapping', 'SQL', 'A/B Testing', 'Agile/Scrum', 'User Research', 'Tableau'],
    demandLevel: 'Moderate-High',
    description: 'Companies seek technical PMs with proven track records in revenue acceleration and AI workflows.'
  }
};

export function estimateSalary(roleName = 'Senior Full Stack Engineer', location = 'Remote (US)', experienceYears = 4) {
  let matched = ROLE_BENCHMARKS[roleName];
  if (!matched) {
    // Fallback match
    const lower = roleName.toLowerCase();
    if (lower.includes('frontend')) matched = ROLE_BENCHMARKS['Senior Frontend Engineer'];
    else if (lower.includes('backend')) matched = ROLE_BENCHMARKS['Senior Backend Engineer'];
    else if (lower.includes('ai') || lower.includes('machine learning')) matched = ROLE_BENCHMARKS['AI / ML Engineer'];
    else if (lower.includes('product')) matched = ROLE_BENCHMARKS['Senior Product Manager'];
    else matched = ROLE_BENCHMARKS['Senior Full Stack Engineer'];
  }

  // Adjust for years of experience
  const expMultiplier = Math.max(0.85, 0.8 + (experienceYears * 0.05));
  const min = Math.round((matched.min * expMultiplier) / 1000) * 1000;
  const median = Math.round((matched.median * expMultiplier) / 1000) * 1000;
  const max = Math.round((matched.max * expMultiplier) / 1000) * 1000;

  return {
    ...matched,
    estimatedRange: { min, median, max },
    formattedMedian: `$${(median / 1000).toFixed(0)}k/year`,
    formattedRange: `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`,
    location
  };
}
