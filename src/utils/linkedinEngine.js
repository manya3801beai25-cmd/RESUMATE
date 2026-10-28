/**
 * LinkedIn Profile Analyzer & AI Enhancement Engine
 * Evaluates Headline, About/Summary, and Skills against tech recruiter search criteria.
 * Generates 4 high-converting headlines and structured recruiter-ready About sections.
 */

// Common high-impact action verbs and metric keywords
export const POWER_VERBS = [
  'architect', 'engineered', 'scaled', 'optimized', 'spearheaded', 'delivered', 
  'developed', 'mentored', 'streamlined', 'pioneered', 'boosted', 'designed'
];

export const METRIC_PATTERNS = [
  /\b\d+%\b/,           // percentage (e.g. 40%)
  /\b\$\d+[\w]*\b/,     // monetary values (e.g. $100k, $2M)
  /\b\d+\+?\s*(users|clients|projects|million|k|team members|developers)\b/i,
  /\b\d+x\b/i           // multipliers (e.g. 2x, 5x)
];

/**
 * Pre-configured 1-click sample profiles for instant demo and evaluation testing
 */
export const LINKEDIN_SAMPLE_PROFILES = {
  fullstack: {
    label: '⚡ Full Stack Engineer',
    targetRole: 'Senior Full Stack Software Engineer',
    headline: 'Senior Full Stack Engineer | React, TypeScript & Node.js | Scaled Web Apps to 1.2M+ Active Users',
    about: `I am a results-driven Senior Full Stack Engineer with 4+ years of experience architecting resilient cloud systems and high-performance React frontends.

🚀 Core Stack: React, TypeScript, Next.js, Node.js, PostgreSQL, Docker, AWS, Tailwind CSS.

💡 Recent Milestones:
• Scaled micro-frontend architecture supporting 1.2M users with 99.9% uptime.
• Reduced initial page bundle size by 42% through code-splitting and memoization.
• Mentored 5 junior developers on clean architecture and automated test pipelines.

Open to high-impact software engineering roles — feel free to connect or email me directly!`,
    skills: 'React, TypeScript, Node.js, PostgreSQL, Next.js, Docker, AWS, Tailwind CSS, REST APIs, Git'
  },
  fresher: {
    label: '🌱 Junior Dev / Fresher',
    targetRole: 'Frontend React Developer (Entry Level)',
    headline: 'Aspiring Frontend Developer | React.js, JavaScript (ES6+) & Tailwind CSS | Computer Science Graduate',
    about: `Recent B.Tech in Computer Science passionate about building responsive, accessible web applications. 

Passionate about UI/UX and modern frontend technologies. I have built multiple personal and academic projects including an ATS resume builder, interactive quiz applications, and e-commerce UI clones.

🚀 Technical Toolkit: React, JavaScript, HTML5, CSS3, Tailwind CSS, Git, GitHub, REST APIs, Vite.

Seeking junior frontend or software engineering roles where I can contribute to user-facing features and grow rapidly with an engineering squad. Open to conversations!`,
    skills: 'React, JavaScript, HTML5, CSS3, Tailwind CSS, Git, Vite, REST APIs, Data Structures'
  },
  ml_engineer: {
    label: '🧠 ML & Data Specialist',
    targetRole: 'Machine Learning & AI Engineer',
    headline: 'Machine Learning Engineer | Python, PyTorch & Scikit-Learn | Building Scalable ML Inference Pipelines',
    about: `Data-focused Machine Learning Engineer specializing in statistical modeling, neural networks, and automated model serving.

🚀 Technical Expertise: Python, NumPy, Pandas, Scikit-Learn, PyTorch, FastAPI, Docker, SQL, MLOps.

💡 Impact & Projects:
• Trained and deployed customer churn prediction model achieving 92.4% ROC-AUC score.
• Containerized ML inference APIs with FastAPI and Docker, reducing prediction latency to under 35ms.

Passionate about generative AI, computer vision, and applied ML. Let's connect to discuss AI innovation!`,
    skills: 'Python, NumPy, Pandas, Scikit-Learn, PyTorch, Docker, FastAPI, SQL, Statistics'
  }
};

/**
 * Analyzes LinkedIn Profile inputs and returns Recruiter SEO metrics
 */
export function analyzeLinkedInProfile({ headline = '', about = '', skills = '', targetRole = '', language = 'en', tone = 'professional' }) {
  const normHeadline = (headline || '').trim();
  const normAbout = (about || '').trim();
  const normSkills = (skills || '').trim();
  const roleName = (targetRole || '').trim() || 'Software Engineer';

  // 1. Audit Headline
  let headlineScore = 40;
  const headlineFeedback = [];

  if (normHeadline.length >= 35 && normHeadline.length <= 160) {
    headlineScore += 20;
    headlineFeedback.push('Optimal headline length (35-160 characters) displays cleanly without mobile truncation.');
  } else if (normHeadline.length < 35) {
    headlineFeedback.push('Headline is brief. Add your core tech stack and quantifiable achievements.');
  } else {
    headlineFeedback.push('Headline is over 160 characters. Front-load critical job titles before truncation.');
  }

  // Check for separator like | or • or -
  if (/[|•\-/]/.test(normHeadline)) {
    headlineScore += 15;
    headlineFeedback.push('Effective use of visual separators (| or •) enhances recruiter scanning efficiency.');
  } else {
    headlineFeedback.push('Tip: Use visual dividers like "|" or "•" to separate target role, tech stack, and achievements.');
  }

  // Check role keywords
  const hasRoleMention = normHeadline.toLowerCase().includes(roleName.toLowerCase().split(' ')[0]) || 
    /developer|engineer|analyst|architect|specialist/i.test(normHeadline);
  if (hasRoleMention) {
    headlineScore += 15;
  } else {
    headlineFeedback.push(`Explicitly mention your target title ("${roleName}") so recruiters find you in candidate search.`);
  }

  // Check power verbs or metrics in headline
  const detectedHeadlineVerbs = POWER_VERBS.filter(v => normHeadline.toLowerCase().includes(v));
  const hasHeadlineMetrics = METRIC_PATTERNS.some(p => p.test(normHeadline));

  if (detectedHeadlineVerbs.length > 0 || hasHeadlineMetrics) {
    headlineScore += 10;
    headlineFeedback.push('Contains high-impact action keywords or quantifiable metrics in headline.');
  }

  headlineScore = Math.min(100, Math.max(20, headlineScore));

  // 2. Audit About Section
  let aboutScore = 30;
  const aboutFeedback = [];
  const words = normAbout.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount >= 60 && wordCount <= 350) {
    aboutScore += 25;
    aboutFeedback.push(`Great word count (${wordCount} words). Comprehensive without causing recruiter fatigue.`);
  } else if (wordCount < 60) {
    aboutFeedback.push(`About section is brief (${wordCount} words). Expand with your career story, technical specialties, and projects.`);
  } else {
    aboutFeedback.push(`About section is lengthy (${wordCount} words). Use bullet points and paragraphs to improve readability.`);
  }

  // Check for Call To Action (CTA)
  const hasCTA = /\b(connect|reach out|email|let's talk|open to|contact me|feel free|message)\b/i.test(normAbout);
  if (hasCTA) {
    aboutScore += 20;
    aboutFeedback.push('Strong Call-To-Action (CTA) encouraging recruiters to message or email you.');
  } else {
    aboutFeedback.push('Missing a clear Call-To-Action (CTA). End with: "Open to new opportunities — reach me via DM or email!"');
  }

  // Check for quantifiable impact / metrics in About
  const detectedAboutMetrics = METRIC_PATTERNS.filter(p => p.test(normAbout));
  if (detectedAboutMetrics.length > 0) {
    aboutScore += 15;
    aboutFeedback.push('Great use of quantifiable achievements (% increase, user numbers, uptime).');
  } else {
    aboutFeedback.push('No measurable numbers detected. Add metrics (e.g. "reduced latency by 35%", "built 5+ client apps").');
  }

  // Check for Tech Stack list
  const hasStackList = /(tech stack|technologies|proficient in|skills|tools|languages|toolkit)/i.test(normAbout);
  if (hasStackList) {
    aboutScore += 10;
  }

  aboutScore = Math.min(100, Math.max(20, aboutScore));

  // 3. Keyword & Action Verb Detector
  const detectedVerbs = POWER_VERBS.filter(v => (normHeadline + ' ' + normAbout).toLowerCase().includes(v));
  let keywordScore = 50;
  if (normSkills.length > 20) keywordScore += 25;
  if (detectedVerbs.length >= 2) keywordScore += 15;
  if (detectedAboutMetrics.length > 0 || hasHeadlineMetrics) keywordScore += 10;
  keywordScore = Math.min(100, keywordScore);

  // Overall Weighted Recruiter SEO Score
  const overallScore = Math.round((headlineScore * 0.35) + (aboutScore * 0.45) + (keywordScore * 0.20));

  // 4. Generate 4 High-Converting Headline Variations
  const userSkillList = normSkills ? normSkills.split(',').map(s => s.trim()).filter(Boolean) : ['React', 'Node.js', 'TypeScript', 'AWS'];
  const topSkills = userSkillList.slice(0, 3).join(' • ');

  const generatedHeadlines = [
    {
      type: '⚡ Role & Core Stack',
      description: 'Best for direct search keyword ranking by recruiters.',
      headline: `${roleName} | ${topSkills} | Scalable Distributed Systems`
    },
    {
      type: '📈 Metric & High Impact',
      description: 'Stands out with measurable performance improvements.',
      headline: `${roleName} @ Tech | Boosted Platform Speed by 38% & Engineered Cloud Services | ${userSkillList[0] || 'React'} Specialist`
    },
    {
      type: '🎯 Value Proposition',
      description: 'Focuses on the unique business value you deliver.',
      headline: `Passionate ${roleName} Crafting Resilient Digital Products | ${topSkills} | Open Source Contributor`
    },
    {
      type: '🌱 Quick Learner / Fresher',
      description: 'Perfect for college graduates and aspiring juniors.',
      headline: `Aspiring ${roleName} | Strong DSA & Modern ${userSkillList[0] || 'React'} Development | Computer Science Graduate`
    }
  ];

  // 5. Generate AI Enhanced Recruiter-Ready About Section (Adapts to tone and language)
  let generatedAbout = '';
  if (language === 'hi') {
    generatedAbout = `नमस्ते! मैं एक परिणाम-उन्मुख ${roleName} हूँ, जो आधुनिक वेब तकनीकों और स्केलेबल सॉफ्टवेयर आर्किटेक्चर के निर्माण में रुचि रखता हूँ।

🚀 मुख्य तकनीकी विशेषज्ञता:
• कोर भाषाएं एवं फ्रेमवर्क: ${userSkillList.join(', ') || 'React, JavaScript, Node.js, Python, SQL'}
• डेटाबेस एवं टूल्स: PostgreSQL, Docker, AWS, Git, RESTful APIs
• समस्या समाधान: डेटा स्ट्रक्चर्स, क्लीन कोड और एजाइल वर्कफ्लो

💡 मेरी करियर उपलब्धियां:
• स्केलेबल और रिस्पॉन्सिव वेब एप्लीकेशन्स का सफल निर्माण और डिप्लॉयमेंट।
• आधुनिक कोडिंग मानकों का पालन करते हुए सिस्टम परफॉरमेंस में 30%+ का सुधार।
• टीम के साथ मिलकर समय पर हाई-क्वालिटी फीचर्स डिलीवर करना।

📫 आइए जुड़ें!
मैं हमेशा नई तकनीकी चुनौतियों और रोमांचक करियर अवसरों के लिए उत्सुक हूँ।
मुझसे लिंक्डइन पर सीधे कनेक्ट करें या ईमेल के माध्यम से संपर्क करें!`;
  } else if (language === 'pa') {
    generatedAbout = `ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ! ਮੈਂ ਇੱਕ ਉਤਸ਼ਾਹੀ ${roleName} ਹਾਂ, ਜੋ ਆਧੁਨਿਕ ਤਕਨੀਕਾਂ ਨਾਲ ਮਜ਼ਬੂਤ ਅਤੇ ਤੇਜ਼ ਸਾਫਟਵੇਅਰ ਸਿਸਟਮ ਬਣਾਉਣ ਵਿੱਚ ਮਾਹਰ ਹਾਂ।

🚀 ਮੁੱਖ ਤਕਨੀਕੀ ਹੁਨਰ:
• ਫਰੇਮਵਰਕ ਅਤੇ ਭਾਸ਼ਾਵਾਂ: ${userSkillList.join(', ') || 'React, JavaScript, Node.js, Java, SQL'}
• ਡਾਟਾਬੇਸ ਅਤੇ ਕਲਾਉਡ: Docker, PostgreSQL, REST APIs, Git, AWS
• ਐਲਗੋਰਿਦਮ ਅਤੇ ਸਮੱਸਿਆ ਹੱਲ: Data Structures & Clean Architecture

💡 ਪ੍ਰਾਪਤੀਆਂ ਅਤੇ ਪ੍ਰੋਜੈਕਟ:
• ਉੱਚ ਪੱਧਰੀ ਰਿਸਪਾਂਸਿਵ ਵੈੱਬ ਐਪਲੀਕੇਸ਼ਨਾਂ ਤਿਆਰ ਅਤੇ ਲਾਂਚ ਕੀਤੀਆਂ।
• ਟੀਮ ਨਾਲ ਮਿਲ ਕੇ ਬਿਹਤਰੀਨ ਫੀਚਰ ਸਮੇਂ ਸਿਰ ਮੁਕੰਮਲ ਕੀਤੇ।

📫 ਆਓ ਜੁੜੀਏ!
ਮੈਂ ਨਵੇਂ ਕਰੀਅਰ ਮੌਕਿਆਂ ਅਤੇ ਸਹਿਯੋਗ ਲਈ ਹਮੇਸ਼ਾ ਤਿਆਰ ਹਾਂ। ਮੇਰੇ ਨਾਲ ਲਿੰਕਡਇਨ 'ਤੇ ਸਿੱਧਾ ਸੰਪਰਕ ਕਰੋ!`;
  } else {
    if (tone === 'fresher') {
      generatedAbout = `Hello! I am a passionate and driven ${roleName} eager to make an impact in software development.

🎓 Background & Education:
Passionate Computer Science graduate with solid fundamentals in Data Structures, Algorithms, and Modern Web Development.

🚀 Core Technical Toolkit:
• Frontend: ${userSkillList.slice(0, 3).join(', ') || 'React, JavaScript, Tailwind CSS'}
• Backend & Tools: ${userSkillList.slice(3).join(', ') || 'Node.js, PostgreSQL, Git, GitHub, REST APIs'}

💡 Key Projects Built:
• Engineered responsive web applications focusing on clean component architecture and smooth UX.
• Implemented client-side performance optimizations, achieving high lighthouse scores.

📫 Let's Connect:
Actively seeking junior software engineer or frontend developer opportunities. Feel free to connect directly here on LinkedIn or drop a message!`;
    } else if (tone === 'startup') {
      generatedAbout = `I build fast, scalable, and resilient digital products as a ${roleName}.

🛠️ What I Bring to the Table:
• High velocity product execution with ${userSkillList.slice(0, 4).join(', ') || 'React, TypeScript, Node.js'}
• Deep focus on system performance, API response latency, and intuitive UX
• End-to-end ownership from Figma prototype to production deployment

⚡ Track Record:
• Boosted application speed and reduced bundle sizes across production web apps.
• Championed clean code practices, automated CI/CD pipelines, and high test coverage.

Let's build something extraordinary together. Send me a connection request or DM!`;
    } else {
      // Default: Professional / Corporate
      generatedAbout = `I am a results-driven ${roleName} passionate about architecting scalable, high-performance web applications and resilient distributed systems.

🚀 Core Technical Arsenal:
• Frontend & Architecture: ${userSkillList.slice(0, 4).join(', ') || 'React, TypeScript, Next.js, Tailwind CSS'}
• Backend & Cloud: ${userSkillList.slice(4).join(', ') || 'Node.js, Express, PostgreSQL, Docker, AWS, REST APIs'}
• Methodologies: Clean Architecture, CI/CD, Agile Sprint Delivery & Automated Testing

💡 Career Highlights & Impact:
• Architected enterprise-grade applications serving high-concurrency user traffic with 99.9% uptime.
• Reduced API response latency by 35% through query optimization and caching strategies.
• Passionate mentor and collaborative team player committed to clean code and continuous learning.

📫 Let's Connect!
I am actively seeking exciting opportunities to build transformative products. Feel free to connect directly here on LinkedIn or drop me an email!`;
    }
  }

  return {
    overallScore,
    headlineScore,
    aboutScore,
    keywordScore,
    headlineFeedback,
    aboutFeedback,
    detectedVerbs,
    wordCount,
    generatedHeadlines,
    generatedAbout
  };
}
