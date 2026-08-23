import React, { createContext, useContext, useState, useMemo } from 'react';
import { calculateAtsMatch } from '../utils/atsEngine';

const ResumeContext = createContext();

const INITIAL_RESUME = {
  personal: {
    fullName: 'Alex Rivera',
    roleTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.rivera@email.com',
    phone: '(555) 342-9812',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    github: 'github.com/alexrivera',
    website: 'alexrivera.dev'
  },
  summary: 'Results-driven Full Stack Software Engineer with 4+ years of experience building high-scale distributed systems, performant React frontends, and RESTful microservices. Boosted application speed by 38% for 1.2M active users.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'NexaTech Solutions',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected dynamic client web applications using React, TypeScript, Tailwind CSS, and Next.js, boosting lighthouse performance score from 64 to 98.',
        'Reduced initial bundle size by 42% through code splitting, tree shaking, and dynamic lazy loading across 40+ view routes.',
        'Engineered real-time WebSockets notification engine handling 50k concurrent connection spikes with zero downtime.',
        'Mentored 5 junior engineers and led weekly code reviews, establishing strict CI/CD linting with GitHub Actions.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'CloudScale Inc',
      location: 'San Jose, CA',
      startDate: '2020-06',
      endDate: '2022-02',
      current: false,
      bullets: [
        'Developed scalable RESTful backend microservices in Node.js, Express, and PostgreSQL, supporting 250k daily transactions.',
        'Containerized core services with Docker and deployed via Kubernetes clusters on AWS EC2 & S3.',
        'Implemented Redis distributed caching layer, reducing database read response times from 180ms to 24ms.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Resumate AI Copilot',
      link: 'github.com/alexrivera/resumate',
      techStack: 'React, TypeScript, Tailwind, Web Speech API',
      bullets: [
        'Built full-text ATS resume parsing and Google XYZ bullet scorer with 99.4% accuracy.',
        'Scaled client-side heuristics engine with 0ms server latency.'
      ]
    },
    {
      id: 'proj-2',
      name: 'DevFlow Cloud IDE',
      link: 'devflow.io',
      techStack: 'Node.js, WebSockets, Docker, Redis',
      bullets: [
        'Engineered collaborative in-browser code editor supporting 20+ concurrent coders per room.'
      ]
    }
  ],
  skills: {
    languages: 'JavaScript, TypeScript, Python, SQL, HTML5, CSS3, Bash',
    frameworks: 'React, Next.js, Node.js, Express, Tailwind CSS, Redux, Jest',
    cloudDatabases: 'AWS (S3, EC2, Lambda), Docker, Kubernetes, PostgreSQL, MongoDB, Redis, Git, CI/CD',
    methodologies: 'Agile, Scrum, System Design, REST APIs, Microservices, Performance Tuning'
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      year: '2016 - 2020',
      gpa: '3.8 / 4.0'
    }
  ]
};

const PRESETS = {
  softwareEngineer: INITIAL_RESUME,
  productManager: {
    personal: {
      fullName: 'Sarah Chen',
      roleTitle: 'Senior Product Manager',
      email: 'sarah.chen@productmail.com',
      phone: '(555) 789-1234',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/sarahchen-pm',
      github: '',
      website: 'sarahchen.io'
    },
    summary: 'Strategic Senior Product Manager with 5+ years driving SaaS product growth, cross-functional roadmaps, and AI feature execution. Spearheaded enterprise product launch that generated $3.4M ARR in Year 1.',
    experiences: [
      {
        id: 'pm-exp-1',
        role: 'Senior Product Manager',
        company: 'Veloce Systems',
        location: 'New York, NY',
        startDate: '2021-04',
        endDate: 'Present',
        current: true,
        bullets: [
          'Led end-to-end product lifecycle for flagship B2B analytics platform, increasing Net Retention Rate (NRR) from 104% to 128%.',
          'Prioritized roadmap using data-driven OKRs, customer feedback loops, and competitive intelligence across 6 engineering squads.',
          'Launched AI-assisted recommendation engine, lifting user daily engagement by 34% and reducing churn by 18%.'
        ]
      }
    ],
    projects: [
      {
        id: 'pm-proj-1',
        name: 'Enterprise Onboarding Redesign',
        link: 'veloce.com/case-study',
        techStack: 'Figma, Mixpanel, Jira, SQL',
        bullets: [
          'Optimized onboarding funnel conversion by 27% via structured A/B testing and interactive product tours.'
        ]
      }
    ],
    skills: {
      languages: 'SQL, Python (Basic)',
      frameworks: 'Roadmapping, PRD Drafting, Agile, Scrum, Kanban, Jira, Confluence',
      cloudDatabases: 'Tableau, Mixpanel, Google Analytics, Amplitude, Snowflake',
      methodologies: 'Product Discovery, A/B Testing, Stakeholder Management, User Interviews, OKR Setting'
    },
    education: [
      {
        id: 'pm-edu-1',
        degree: 'B.S. in Business Information Systems',
        school: 'NYU Stern School of Business',
        location: 'New York, NY',
        year: '2015 - 2019',
        gpa: '3.9 / 4.0'
      }
    ]
  }
};

export function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumate_active_resume');
    return saved ? JSON.parse(saved) : INITIAL_RESUME;
  });

  const [activeTemplate, setActiveTemplate] = useState('modern'); // 'modern', 'minimal', 'executive', 'emerald'
  const [targetJobDescription, setTargetJobDescription] = useState(`Job Title: Senior Full Stack Engineer
Required Skills: React, TypeScript, Node.js, PostgreSQL, AWS, Docker, Kubernetes, CI/CD, Agile.`);

  // Auto-save active resume
  const updateResumeData = (updater) => {
    setResumeData(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      localStorage.setItem('resumate_active_resume', JSON.stringify(next));
      return next;
    });
  };

  // Convert resume state into plain text for ATS scoring
  const plainTextResume = useMemo(() => {
    const p = resumeData.personal || {};
    const expText = (resumeData.experiences || []).map(e => `${e.role} at ${e.company}\n${(e.bullets || []).join('\n')}`).join('\n\n');
    const projText = (resumeData.projects || []).map(pr => `${pr.name} (${pr.techStack}):\n${(pr.bullets || []).join('\n')}`).join('\n\n');
    const skillsText = Object.values(resumeData.skills || {}).join(' ');
    const eduText = (resumeData.education || []).map(ed => `${ed.degree} ${ed.school} ${ed.year}`).join(' ');

    return `${p.fullName} - ${p.roleTitle}
${p.email} | ${p.phone} | ${p.location} | ${p.linkedin} | ${p.github}

SUMMARY
${resumeData.summary}

EXPERIENCE
${expText}

PROJECTS
${projText}

SKILLS
${skillsText}

EDUCATION
${eduText}`;
  }, [resumeData]);

  // Live ATS evaluation of the current resume
  const liveAtsScore = useMemo(() => {
    return calculateAtsMatch(plainTextResume, targetJobDescription);
  }, [plainTextResume, targetJobDescription]);

  const loadPreset = (presetKey) => {
    if (PRESETS[presetKey]) {
      updateResumeData(PRESETS[presetKey]);
    }
  };

  const resetResume = () => {
    updateResumeData(INITIAL_RESUME);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updateResumeData,
        activeTemplate,
        setActiveTemplate,
        plainTextResume,
        liveAtsScore,
        targetJobDescription,
        setTargetJobDescription,
        loadPreset,
        resetResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}
