/**
 * AI Mock Interview Simulator Engine
 * Supports STAR Evaluation, Rapid-Fire Blitz (20s), and Voice Synthesizer / STT
 */

export const INTERVIEW_ROLES = [
  { id: 'fullstack', label: 'Full Stack Engineer', category: 'Engineering' },
  { id: 'frontend', label: 'Frontend Engineer (React)', category: 'Engineering' },
  { id: 'backend', label: 'Backend Engineer (Node/Cloud)', category: 'Engineering' },
  { id: 'ai_ml', label: 'AI & Machine Learning Engineer', category: 'Data & AI' },
  { id: 'product', label: 'Product Manager', category: 'Product' },
  { id: 'behavioral', label: 'General Behavioral & Leadership', category: 'General' }
];

export const QUESTION_BANK = {
  fullstack: [
    {
      id: 'fs-1',
      question: 'Tell me about a time you had to diagnose and resolve a severe performance bottleneck across the full stack.',
      category: 'System Performance',
      starTips: {
        situation: 'Describe the latency spike, affected users, or infrastructure costs.',
        task: 'Identify your responsibility in troubleshooting the client vs database issue.',
        action: 'Detail the profiling tools used (e.g. Chrome DevTools, query plans, caching).',
        result: 'Share quantified improvements (e.g. 60% latency drop, memory footprint reduction).'
      },
      sampleKeywords: ['profiling', 'caching', 'redis', 'query optimization', 'latency', 'indexes', 'reduced']
    },
    {
      id: 'fs-2',
      question: 'How do you design a secure, fault-tolerant authentication and authorization architecture for microservices?',
      category: 'Architecture & Security',
      starTips: {
        situation: 'Contextualize the system scale and security requirements (SSO, OAuth, JWT).',
        task: 'Specify the auth requirements and compliance constraints.',
        action: 'Explain token lifecycle, refresh rotations, API gateway validation, and RBAC.',
        result: 'State security audit pass rates and zero-downtime integration.'
      },
      sampleKeywords: ['jwt', 'oauth2', 'refresh token', 'api gateway', 'rbac', 'encryption', 'tls']
    },
    {
      id: 'fs-3',
      question: 'Describe a situation where you had to negotiate technical debt with non-technical stakeholders to meet a tight deadline.',
      category: 'Behavioral & Leadership',
      starTips: {
        situation: 'Explain the deadline pressure vs the fragility of legacy architecture.',
        task: 'Your role in framing technical risks in terms of business impact.',
        action: 'How you compromised: phased refactoring, feature flag rollouts, or sprint allocations.',
        result: 'On-time delivery with measurable regression test coverage.'
      },
      sampleKeywords: ['stakeholders', 'tradeoffs', 'prioritization', 'refactoring', 'timeline', 'phased rollout']
    }
  ],
  frontend: [
    {
      id: 'fe-1',
      question: 'How do you optimize a complex React application experiencing sluggish re-renders and large bundle sizes?',
      category: 'React Optimization',
      starTips: {
        situation: 'Describe the bloated app symptoms (e.g. 5MB bundle, laggy list scrolling).',
        task: 'Your goal to achieve sub-second TTFB and 90+ Lighthouse score.',
        action: 'Mention useMemo, useCallback, React.memo, virtualized lists, lazy loading, and code splitting.',
        result: 'Bundle reduced by 40%+, FPS stabilized at 60fps.'
      },
      sampleKeywords: ['bundle size', 'lazy loading', 'usememo', 'usecallback', 'virtualization', 'lighthouse']
    },
    {
      id: 'fe-2',
      question: 'Walk me through how you ensure accessibility (WCAG 2.1 AA) and responsive design across diverse devices.',
      category: 'Accessibility & Design',
      starTips: {
        situation: 'Need to make a legacy dashboard accessible to assistive technologies.',
        task: 'Your responsibility for ADA/WCAG compliance audit.',
        action: 'Implemented ARIA landmarks, keyboard navigation, semantic HTML5, screen-reader testing.',
        result: 'Achieved 100% WCAG AA compliance score.'
      },
      sampleKeywords: ['aria', 'wcag', 'screen reader', 'semantic html', 'keyboard navigation', 'contrast']
    }
  ],
  backend: [
    {
      id: 'be-1',
      question: 'How would you architect a distributed background task queue capable of processing 10 million jobs daily?',
      category: 'Distributed Systems',
      starTips: {
        situation: 'High volume spike causing database lock contention and lost jobs.',
        task: 'Architect a decoupled async queue with idempotent retries.',
        action: 'Utilized Kafka/RabbitMQ/BullMQ, dead-letter queues, worker auto-scaling, and Redis locks.',
        result: 'Processed 10M+ daily events with 99.99% message delivery SLA.'
      },
      sampleKeywords: ['queue', 'kafka', 'rabbitmq', 'idempotency', 'dead-letter', 'worker', 'scaling']
    },
    {
      id: 'be-2',
      question: 'Describe how you troubleshoot a sudden database connection pool exhaustion in production.',
      category: 'Database Management',
      starTips: {
        situation: 'API throwing 500 errors due to exhausted database connections during peak traffic.',
        task: 'Identify the leak, unclosed transactions, or slow queries.',
        action: 'Analyzed pg_stat_activity, tuned max_connections, added connection pooling (PgBouncer), and optimized unindexed queries.',
        result: 'Restored service in 15 mins, connection utilization capped at 65%.'
      },
      sampleKeywords: ['connection pool', 'pgbouncer', 'slow queries', 'indexes', 'transactions', 'monitoring']
    }
  ],
  ai_ml: [
    {
      id: 'ai-1',
      question: 'How do you build and evaluate a Retrieval-Augmented Generation (RAG) pipeline to minimize hallucinations?',
      category: 'LLM & RAG Systems',
      starTips: {
        situation: 'Chatbot hallucinating facts on private internal documentation.',
        task: 'Design a high-precision semantic chunking and retrieval pipeline.',
        action: 'Configured hybrid vector search (BM25 + Dense Embeddings), reranking, and citation prompts.',
        result: 'Cut hallucination rate by 82% and boosted retrieval precision.'
      },
      sampleKeywords: ['rag', 'vector database', 'embeddings', 'chunking', 'reranker', 'hallucination', 'cosine similarity']
    }
  ],
  product: [
    {
      id: 'pm-1',
      question: 'How do you prioritize competing feature requests from enterprise clients vs core product stability?',
      category: 'Product Strategy',
      starTips: {
        situation: 'High-paying client requesting custom feature while core app needs refactoring.',
        task: 'Balance near-term ARR with long-term platform velocity.',
        action: 'Used RICE scoring framework, quantified impact, and proposed a generalized modular solution.',
        result: 'Retained $500K contract while reducing tech debt sprint-over-sprint.'
      },
      sampleKeywords: ['rice framework', 'tradeoffs', 'arr', 'roadmap', 'customer discovery', 'okrs']
    }
  ],
  behavioral: [
    {
      id: 'beh-1',
      question: 'Describe a situation where a project you were leading was falling behind schedule. How did you handle it?',
      category: 'Conflict & Project Management',
      starTips: {
        situation: 'Key dependency blocked 2 weeks prior to crucial launch date.',
        task: 'Your role as team lead to realign deliverables without sacrificing quality.',
        action: 'Scoped MVP features, held daily unblocking standups, and communicated proactively with executive sponsors.',
        result: 'Delivered core MVP on scheduled launch day with zero critical bugs.'
      },
      sampleKeywords: ['proactive communication', 'scope reduction', 'mvp', 'unblocking', 'stakeholders', 'on time']
    }
  ]
};

/**
 * Evaluates Candidate Answer using STAR methodology
 */
export function evaluateAnswer(answerText = '', question = null) {
  const text = answerText.trim();
  if (!text || text.split(/\s+/).length < 8) {
    return {
      score: 20,
      starChecklist: { situation: false, task: false, action: false, result: false },
      metricsFound: 0,
      actionVerbsFound: 0,
      feedback: ['Your answer is very short. Elaborate with specific details following the STAR method.']
    };
  }

  const lower = text.toLowerCase();
  const words = lower.split(/\s+/);

  // Heuristic STAR detection
  const hasSituation = /\b(when|situation|context|at my previous|company|project was|faced with|problem was)\b/i.test(text);
  const hasTask = /\b(my task|goal was|needed to|responsibility|objective was|assigned to|aimed to)\b/i.test(text);
  const hasAction = /\b(i implemented|i architected|i developed|i led|i created|i analyzed|i investigated|i collaborated|i decided)\b/i.test(text);
  const hasResult = /\b(resulted in|as a result|ultimately|increased by|reduced by|achieved|delivered|improved|saved)\b/i.test(text);

  // Metrics
  const metricMatches = text.match(/(\d+%\s*|\$\s*\d+|\d+\s*(?:users|clients|ms|s|x|engineers|hours|days|weeks|months))/gi) || [];
  const metricsFound = metricMatches.length;

  let starScore = 30;
  const feedback = [];

  if (hasSituation) {
    starScore += 15;
    feedback.push('✓ Clearly framed the initial Situation and context.');
  } else {
    feedback.push('⚠ Context could be stronger. State the initial challenge or company setting.');
  }

  if (hasTask) {
    starScore += 15;
    feedback.push('✓ Explicitly outlined your specific Task and objective.');
  } else {
    feedback.push('⚠ Clarify your personal responsibility versus the overall team task.');
  }

  if (hasAction) {
    starScore += 20;
    feedback.push('✓ Highlighted decisive Actions you personally took.');
  } else {
    feedback.push('⚠ Use first-person action verbs ("I architected...", "I resolved...") instead of generic passive phrases.');
  }

  if (hasResult) {
    starScore += 20;
    feedback.push('✓ Closed with a concrete Result and positive business outcome.');
  } else {
    feedback.push('⚠ Missing a clear finale. Always conclude with the final business outcome or key lesson.');
  }

  if (metricsFound > 0) {
    starScore += 10;
    feedback.push(`✓ Excellent metric quantification detected (${metricMatches.slice(0, 2).join(', ')}).`);
  } else {
    feedback.push('💡 Add quantifiable numbers (e.g. "% improvement", "time saved", or "user volume").');
  }

  return {
    score: Math.min(98, Math.max(25, starScore)),
    starChecklist: {
      situation: hasSituation,
      task: hasTask,
      action: hasAction,
      result: hasResult
    },
    metricsFound,
    wordCount: words.length,
    feedback
  };
}

/**
 * Text-to-Speech synthesizer helper using Web Speech API
 */
export function speakQuestion(text, onEndCallback = () => {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  window.speechSynthesis.cancel(); // Stop any previous voice
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  
  // Try to pick a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David')) && v.lang.startsWith('en'));
  if (naturalVoice) utterance.voice = naturalVoice;

  utterance.onend = () => {
    onEndCallback();
  };

  utterance.onerror = () => {
    onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

/**
 * Stop any running TTS
 */
export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
